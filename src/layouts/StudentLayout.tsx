import React, { useState, useEffect, useCallback } from 'react';
import { StudentSession, GameId, Question, AnswerLog, SyncStatus } from '../types';
import { Navbar } from '../components/Navbar';
import { LandingScreen } from '../components/LandingScreen';
import { GameHub } from '../components/GameHub';
import { PlayScreen } from '../components/PlayScreen';
import { BossBattleScreen } from '../components/BossBattleScreen';
import { CertificateScreen } from '../components/CertificateScreen';
import { GameResultModal } from '../components/GameResultModal';
import { ResumeSessionModal } from '../components/ResumeSessionModal';
import {
  createInitialSession,
  selectGameQuestions,
  selectAndFreezeQuestionIdsForGame,
  getBadge,
} from '../lib/scoring';
import {
  saveActiveSessionLocal,
  loadActiveSessionLocal,
  clearActiveSessionLocal,
  syncGameBatch,
  syncFinalizeSession,
  flushPendingSyncQueue,
  getPendingSyncEvents,
} from '../lib/storage';

export const StudentLayout: React.FC = () => {
  const [session, setSession] = useState<StudentSession | null>(null);
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [pendingResumeSession, setPendingResumeSession] = useState<StudentSession | null>(null);
  const [currentView, setCurrentView] = useState<'landing' | 'hub' | 'play' | 'boss' | 'certificate'>('landing');
  const [activeGameId, setActiveGameId] = useState<GameId | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [lastGameResult, setLastGameResult] = useState<{
    gameId: GameId;
    score: { correct: number; total: number; xp: number };
  } | null>(null);

  // Background auto-sync trigger
  const triggerSyncCheck = useCallback(async () => {
    if (!navigator.onLine) {
      setSyncStatus('offline');
      setPendingSyncCount(getPendingSyncEvents().length);
      return;
    }

    const pending = getPendingSyncEvents();
    setPendingSyncCount(pending.length);

    if (pending.length > 0) {
      setSyncStatus('syncing');
      try {
        const { remaining } = await flushPendingSyncQueue();
        setPendingSyncCount(remaining);
        setSyncStatus(remaining === 0 ? 'synced' : 'pending');
      } catch {
        setSyncStatus('pending');
      }
    } else {
      setSyncStatus('synced');
    }
  }, []);

  // 1. Initial Load & Recovery detection
  useEffect(() => {
    const saved = loadActiveSessionLocal();
    if (saved && saved.sessionId && saved.studentName) {
      // If session exists, prompt student to resume
      setPendingResumeSession(saved);
      setShowResumeModal(true);
    }

    // Set up network listeners
    const handleOnline = () => triggerSyncCheck();
    const handleOffline = () => setSyncStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const interval = setInterval(triggerSyncCheck, 15000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [triggerSyncCheck]);

  // Save session state to local storage and update memory
  const updateSessionState = (newSession: StudentSession) => {
    setSession(newSession);
    saveActiveSessionLocal(newSession);
  };

  // Start fresh student session
  const handleStartSession = (name: string, studentClass: string) => {
    const newSession = createInitialSession(name, studentClass);
    updateSessionState(newSession);
    setStreak(0);
    setCurrentView('hub');
  };

  // Resume uncompleted session
  const handleResumeSession = () => {
    if (!pendingResumeSession) return;
    const restored = pendingResumeSession;
    setSession(restored);
    setStreak(restored.streak || 0);
    setShowResumeModal(false);
    setPendingResumeSession(null);

    // If student was mid-game, restore that game directly
    if (restored.currentGame) {
      const qIds = restored.selectedQuestionIds[restored.currentGame];
      const questions = selectGameQuestions(restored.currentGame, 5, qIds);
      setActiveGameId(restored.currentGame);
      setActiveQuestions(questions);

      if (restored.currentGame === 'boss') {
        setCurrentView('boss');
      } else {
        setCurrentView('play');
      }
    } else {
      setCurrentView('hub');
    }
  };

  // Discard local session and start fresh
  const handleStartNewSessionFromModal = () => {
    clearActiveSessionLocal();
    setSession(null);
    setPendingResumeSession(null);
    setShowResumeModal(false);
    setStreak(0);
    setCurrentView('landing');
  };

  // Switch student / Log out
  const handleExitSession = () => {
    clearActiveSessionLocal();
    setSession(null);
    setActiveGameId(null);
    setStreak(0);
    setCurrentView('landing');
  };

  // Launch a game with frozen session questions
  const handleSelectGame = (gameId: GameId) => {
    if (!session) return;

    let frozenIds = session.selectedQuestionIds[gameId];
    if (!frozenIds || frozenIds.length < 5) {
      frozenIds = selectAndFreezeQuestionIdsForGame(gameId, 5);
      session.selectedQuestionIds[gameId] = frozenIds;
    }

    const questions = selectGameQuestions(gameId, 5, frozenIds);
    setActiveGameId(gameId);
    setActiveQuestions(questions);

    const updatedSession: StudentSession = {
      ...session,
      currentGame: gameId,
      currentQuestionIndex: 0,
    };
    updateSessionState(updatedSession);

    if (gameId === 'boss') {
      setCurrentView('boss');
    } else {
      setCurrentView('play');
    }
  };

  // Handle streak change
  const handleUpdateStreak = (isCorrect: boolean) => {
    setStreak((prev) => {
      const nextStreak = isCorrect ? prev + 1 : 0;
      if (session) {
        updateSessionState({ ...session, streak: nextStreak });
      }
      return nextStreak;
    });
  };

  // Incremental answer logger (per-question progress saving)
  const handleAnswerQuestion = (qIndex: number, log: AnswerLog) => {
    if (!session || !activeGameId) return;

    const existingAnswers = session.answers || [];
    const updatedAnswers = [...existingAnswers, log];

    const updatedSession: StudentSession = {
      ...session,
      currentQuestionIndex: qIndex + 1,
      answers: updatedAnswers,
    };

    updateSessionState(updatedSession);
  };

  // Complete a 5-question game round
  const handleFinishGame = async (result: {
    correct: number;
    total: number;
    xp: number;
    logs: AnswerLog[];
  }) => {
    if (!session || !activeGameId) return;

    const currentScore = session.scores[activeGameId] || { correct: 0, total: 0, xp: 0 };
    const updatedGameScore = {
      correct: currentScore.correct + result.correct,
      total: currentScore.total + result.total,
      xp: currentScore.xp + result.xp,
    };

    const newScores = {
      ...session.scores,
      [activeGameId]: updatedGameScore,
    };

    const completedGames = Array.from(
      new Set([...(session.completedGames || []), activeGameId])
    );

    const scoreList = Object.values(newScores) as { correct: number; total: number; xp: number }[];
    const totalCorrect = scoreList.reduce((acc, s) => acc + s.correct, 0);
    const totalQuestions = scoreList.reduce((acc, s) => acc + s.total, 0);
    const totalXp = scoreList.reduce((acc, s) => acc + s.xp, 0);
    const accuracyPercent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const badgeInfo = getBadge(accuracyPercent);

    const isFinishedAll = completedGames.length >= 5;

    const updatedSession: StudentSession = {
      ...session,
      currentGame: null,
      currentQuestionIndex: 0,
      scores: newScores,
      completedGames,
      totalCorrect,
      totalQuestions,
      accuracyPercent,
      totalXp,
      badge: badgeInfo.title,
      completed: isFinishedAll,
      status: isFinishedAll ? 'completed' : 'in_progress',
      endTime: isFinishedAll ? Date.now() : undefined,
    };

    updateSessionState(updatedSession);

    // Sync batch to server / Google Sheets with LockService & deduplication
    setSyncStatus('syncing');
    syncGameBatch(updatedSession, result.logs).then((ok) => {
      setSyncStatus(ok ? 'synced' : 'pending');
      setPendingSyncCount(getPendingSyncEvents().length);
    });

    if (isFinishedAll) {
      syncFinalizeSession(updatedSession).catch(() => {});
    }

    setLastGameResult({
      gameId: activeGameId,
      score: { correct: result.correct, total: result.total, xp: result.xp },
    });
  };

  // Play again with 5 fresh questions for that game
  const handlePlayAgain = () => {
    if (!session || !activeGameId) return;
    setLastGameResult(null);

    // Generate fresh frozen questions for this new play
    const freshIds = selectAndFreezeQuestionIdsForGame(activeGameId, 5);
    const updatedSelectedIds = {
      ...session.selectedQuestionIds,
      [activeGameId]: freshIds,
    };

    const updatedSession = {
      ...session,
      selectedQuestionIds: updatedSelectedIds,
    };
    updateSessionState(updatedSession);

    handleSelectGame(activeGameId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation Bar (Student only) */}
      <Navbar
        session={session}
        streak={streak}
        syncStatus={syncStatus}
        pendingSyncCount={pendingSyncCount}
        onExitSession={handleExitSession}
        onReturnHub={() => setCurrentView(session ? 'hub' : 'landing')}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingScreen
            onStartSession={handleStartSession}
          />
        )}

        {currentView === 'hub' && session && (
          <GameHub
            session={session}
            onSelectGame={handleSelectGame}
            onViewCertificate={() => setCurrentView('certificate')}
          />
        )}

        {currentView === 'play' && activeGameId && session && (
          <PlayScreen
            gameId={activeGameId}
            questions={activeQuestions}
            initialQuestionIndex={session.currentQuestionIndex || 0}
            studentName={session.studentName}
            studentClass={session.studentClass}
            sessionId={session.sessionId}
            onAnswerQuestion={handleAnswerQuestion}
            onFinishGame={handleFinishGame}
            onExitGame={() => setCurrentView('hub')}
            onUpdateStreak={handleUpdateStreak}
          />
        )}

        {currentView === 'boss' && session && (
          <BossBattleScreen
            questions={activeQuestions}
            initialQuestionIndex={session.currentQuestionIndex || 0}
            studentName={session.studentName}
            studentClass={session.studentClass}
            sessionId={session.sessionId}
            onAnswerQuestion={handleAnswerQuestion}
            onFinishBoss={handleFinishGame}
            onExitGame={() => setCurrentView('hub')}
            onUpdateStreak={handleUpdateStreak}
          />
        )}

        {currentView === 'certificate' && session && (
          <CertificateScreen
            session={session}
            onReturnHub={() => setCurrentView('hub')}
            onRestartAll={() => {
              if (window.confirm('Em có muốn làm mới toàn bộ điểm để thử thách lại từ đầu?')) {
                const refreshed = createInitialSession(session.studentName, session.studentClass);
                updateSessionState(refreshed);
                setCurrentView('hub');
              }
            }}
          />
        )}
      </main>

      {/* Resume Session Modal on Page Reload / F5 */}
      {showResumeModal && pendingResumeSession && (
        <ResumeSessionModal
          session={pendingResumeSession}
          onResume={handleResumeSession}
          onStartNew={handleStartNewSessionFromModal}
        />
      )}

      {/* Game Result Modal */}
      {lastGameResult && (
        <GameResultModal
          gameId={lastGameResult.gameId}
          score={lastGameResult.score}
          onPlayAgain={handlePlayAgain}
          onReturnHub={() => {
            setLastGameResult(null);
            setCurrentView('hub');
          }}
        />
      )}
    </div>
  );
};
