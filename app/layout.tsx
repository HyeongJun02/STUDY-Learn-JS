"use client";
import "./globals.css";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SearchModal from "@/components/SearchModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <html lang="ko">
      <body className="flex min-h-screen bg-[#0e1117] text-[#e6edf3] font-sans">
        {/* 데스크탑용 사이드바 */}
        <Sidebar />

        {/* 모바일 Drawer */}
        <Sidebar
          mobile
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex flex-col flex-1 min-w-0 relative">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            onSearchClick={() => setSearchOpen(true)}
          />
          <main className="flex-1 overflow-y-auto min-w-0 p-6">{children}</main>
        </div>

        {/* 전역 모달 (항상 최상단에 위치) */}
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </body>
    </html>
  );
}
