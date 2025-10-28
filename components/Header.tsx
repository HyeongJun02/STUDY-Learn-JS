"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, Search, Command } from "lucide-react";
import Link from "next/link";
import SearchModal from "@/components/SearchModal";

export default function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [modalOpen, setModalOpen] = useState(false);

  // 테마 적용
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Ctrl+K 단축키 등록
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0e1117]/50 
             border-b border-gray-700 shadow-sm"
      >
        <div className="flex items-center justify-between px-6 py-3 w-full min-w-0">
          {/* 로고 */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-400 to-violet-500" />
            <span className="text-xl font-bold text-gray-100 transition">
              Learn<span className="text-violet-400">JS</span>.kr
            </span>
          </Link>
          {/* 중앙 검색창 */}{" "}
          <button
            onClick={() => setModalOpen(true)}
            className="hidden md:flex items-center gap-2 bg-[#161b22] border border-gray-700 text-gray-400 rounded-md px-3 py-2 text-sm hover:border-[#58a6ff] transition shrink max-w-[300px]"
          >
            {" "}
            <Search size={14} />{" "}
            <span>
              {" "}
              Press{" "}
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 ml-1">
                {" "}
                Alt + K{" "}
              </span>{" "}
              to search{" "}
            </span>{" "}
          </button>
          {/* 우측 아이콘 */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-[#161b22] transition"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-300" />
              ) : (
                <Moon size={18} className="text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </header>

      <SearchModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
