import React, { useState } from 'react';
import { TeacherUser } from '../types';
import { TeacherDashboard } from '../components/teacher/TeacherDashboard';
import { TeacherResultsTable } from '../components/teacher/TeacherResultsTable';
import { TeacherQuestionBank } from '../components/teacher/TeacherQuestionBank';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  LogOut,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';

interface TeacherLayoutProps {
  user: TeacherUser;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
}

export const TeacherLayout: React.FC<TeacherLayoutProps> = ({
  user,
  currentTab,
  onSelectTab,
  onLogout,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-6 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg tracking-tight text-white">
                  HÀNH TRÌNH PYTHON
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
                  CỔNG GIÁO VIÊN
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Hệ thống Quản lý Giảng dạy & Đánh giá Học sinh Lớp 8
              </p>
            </div>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end pl-2 border-l border-slate-800">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                {user.name || user.username}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">
                Đang trực tuyến (Giáo viên)
              </span>
            </div>

            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Đăng xuất khỏi cổng giáo viên"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
            { id: 'results', label: 'Kết quả học sinh', icon: Users },
            { id: 'questions', label: 'Ngân hàng 200 câu hỏi', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Teacher Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {currentTab === 'overview' && <TeacherDashboard onNavigateTab={onSelectTab} />}
        {currentTab === 'results' && <TeacherResultsTable />}
        {currentTab === 'questions' && <TeacherQuestionBank />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500">
        Hệ thống Hành trình Python • Cổng thông tin Giáo viên & Quản trị • Năm học 2025 - 2026
      </footer>
    </div>
  );
};
