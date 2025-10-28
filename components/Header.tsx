"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, Github, Command, Menu } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onMenuClick?: () => void;
  onSearchClick?: () => void;
}

export default function Header({ onMenuClick, onSearchClick }: HeaderProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0e1117]/80 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-[#161b22] rounded"
            aria-label="Open Menu"
          >
            <Menu size={18} />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-100">
              Learn<span className="text-violet-400">JS</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-5 text-sm text-gray-400 ml-8">
            <Link href="/" className="hover:text-[#58a6ff] transition">
              Playground
            </Link>
            <Link href="/docs" className="hover:text-[#58a6ff] transition">
              Docs
            </Link>
            <Link href="/about" className="hover:text-[#58a6ff] transition">
              About
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSearchClick}
            className="hidden md:flex items-center gap-1 text-gray-400 text-sm px-3 py-1.5 bg-[#161b22] border border-gray-700 rounded hover:border-[#58a6ff] transition"
          >
            <Command size={12} />
            <span>Search</span>
          </button>

          <a
            href="https://github.com/hyeongjun02"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded hover:bg-[#161b22] transition"
          >
            <Github size={18} className="text-gray-400 hover:text-[#58a6ff]" />
          </a>

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
  );
}
