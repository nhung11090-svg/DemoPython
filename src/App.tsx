import React, { useState, useEffect } from 'react';
import { StudentLayout } from './layouts/StudentLayout';
import { TeacherLayout } from './layouts/TeacherLayout';
import { TeacherLogin } from './components/teacher/TeacherLogin';
import { TeacherUser } from './types';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [teacherUser, setTeacherUser] = useState<TeacherUser | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [teacherTab, setTeacherTab] = useState<string>('overview');

  // Navigate helper to update browser history & internal route state
  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
  };

  // Sync tab with URL path for teacher routes
  useEffect(() => {
    if (currentPath.startsWith('/teacher/questions')) {
      setTeacherTab('questions');
    } else if (currentPath.startsWith('/teacher/results')) {
      setTeacherTab('results');
    } else if (currentPath.startsWith('/teacher/concurrency') || currentPath.startsWith('/teacher/qa')) {
      setTeacherTab('concurrency');
    } else if (currentPath === '/teacher' || currentPath === '/teacher/overview') {
      setTeacherTab('overview');
    }
  }, [currentPath]);

  // Check Teacher Server Session on load or when navigating to /teacher*
  useEffect(() => {
    const checkAuth = async () => {
      // If student path, no need to block with teacher auth
      if (!currentPath.startsWith('/teacher')) {
        setAuthChecking(false);
        return;
      }

      try {
        const token = localStorage.getItem('pythonQuestTeacherToken');
        const headers: Record<string, string> = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch('/api/teacher/me', { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setTeacherUser(data.user);
          } else {
            setTeacherUser(null);
          }
        } else {
          setTeacherUser(null);
        }
      } catch {
        setTeacherUser(null);
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();

    // Listen to browser Back / Forward events
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPath]);

  // Handle Teacher Login Success
  const handleTeacherLoginSuccess = (user: TeacherUser) => {
    setTeacherUser(user);
    navigate('/teacher');
  };

  // Handle Teacher Logout
  const handleTeacherLogout = async () => {
    try {
      const token = localStorage.getItem('pythonQuestTeacherToken');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      await fetch('/api/teacher/logout', {
        method: 'POST',
        headers,
      });
    } catch {}

    try {
      localStorage.removeItem('pythonQuestTeacherToken');
    } catch {}

    setTeacherUser(null);
    navigate('/teacher/login');
  };

  // Handle Tab Switch in Teacher Layout
  const handleSelectTeacherTab = (tab: string) => {
    setTeacherTab(tab);
    if (tab === 'overview') navigate('/teacher');
    else navigate(`/teacher/${tab}`);
  };

  // -------------------------------------------------------------
  // ROUTE RENDERING
  // -------------------------------------------------------------

  // 1. Teacher Login Route
  if (currentPath === '/teacher/login') {
    if (teacherUser) {
      // Already logged in -> redirect to /teacher
      return (
        <TeacherLayout
          user={teacherUser}
          currentTab={teacherTab}
          onSelectTab={handleSelectTeacherTab}
          onLogout={handleTeacherLogout}
        />
      );
    }
    return <TeacherLogin onLoginSuccess={handleTeacherLoginSuccess} />;
  }

  // 2. Protected Teacher Area Routes (/teacher, /teacher/*)
  if (currentPath.startsWith('/teacher')) {
    if (authChecking) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span>Đang kiểm tra quyền truy cập giáo viên...</span>
          </div>
        </div>
      );
    }

    if (!teacherUser) {
      // Unauthorized -> render TeacherLogin
      return <TeacherLogin onLoginSuccess={handleTeacherLoginSuccess} />;
    }

    return (
      <TeacherLayout
        user={teacherUser}
        currentTab={teacherTab}
        onSelectTab={handleSelectTeacherTab}
        onLogout={handleTeacherLogout}
      />
    );
  }

  // 3. Default: Student Area (/ and /student)
  return <StudentLayout />;
}

export default App;
