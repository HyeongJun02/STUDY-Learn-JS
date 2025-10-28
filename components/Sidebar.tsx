"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, ChevronRight, ChevronDown, X } from "lucide-react";
import menuData from "@/data/menuData";

interface SidebarProps {
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
}

const HEADER_H = 56; // Header 높이 (px)

export default function Sidebar({
  mobile = false,
  open = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggle = (title: string) =>
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );

  // 🔍 검색: 섹션과 아이템 모두 대상으로 필터링
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return menuData
      .map((section) => {
        const matchSection = section.title.toLowerCase().includes(q);
        const items = section.items.filter((i) => i.toLowerCase().includes(q));
        if (matchSection || items.length > 0) {
          return { ...section, items: matchSection ? section.items : items };
        }
        return null;
      })
      .filter(Boolean) as typeof menuData;
  }, [search]);

  // 공통 Sidebar 내부 (검색 + 메뉴)
  const content = (
    <>
      {/* 검색창 */}
      <div className="relative p-4">
        <Search
          size={16}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#161b22] border border-gray-700 text-gray-100 pl-8 pr-3 py-2 rounded 
                     focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 메뉴 리스트 */}
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {filtered.map((section) => {
          const opened =
            openSections.includes(section.title) || search.length > 0;
          return (
            <div key={section.title} className="mb-2">
              <button
                onClick={() => toggle(section.title)}
                className="flex justify-between items-center w-full text-left font-semibold text-gray-100 hover:text-[#58a6ff] transition"
              >
                {section.title}
                {opened ? (
                  <ChevronDown size={14} className="text-gray-500" />
                ) : (
                  <ChevronRight size={14} className="text-gray-500" />
                )}
              </button>

              {opened && (
                <ul className="mt-2 ml-3 space-y-1">
                  {section.items.map((item) => {
                    const href = `/${section.title.toLowerCase()}/${item.toLowerCase()}`;
                    const isActive = pathname === href;
                    return (
                      <li key={item} className="group">
                        <Link
                          href={href}
                          onClick={mobile ? onClose : undefined}
                          className={`relative block text-sm px-2 py-1 rounded-md transition-colors duration-150
                            ${
                              isActive
                                ? "text-[#58a6ff] font-medium bg-[#1f2937]"
                                : "text-gray-400 hover:text-[#58a6ff]"
                            }`}
                        >
                          {/* 좌측 포커스 바 */}
                          <span
                            className={`absolute left-0 top-0 h-full w-[3px] rounded-r-sm bg-[#58a6ff] transition-opacity
                              ${
                                isActive
                                  ? "opacity-100"
                                  : "opacity-0 group-hover:opacity-100"
                              }`}
                          />
                          {item}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );

  // 🖥️ 데스크탑 (고정형 사이드바)
  if (!mobile) {
    return (
      <aside
        className="
          hidden md:flex
          shrink-0 w-64 bg-[#0d1117] border-r border-gray-800 text-gray-300
        "
      >
        <div
          className="sticky"
          style={{
            top: HEADER_H,
            height: `calc(100vh - ${HEADER_H}px)`,
          }}
        >
          {content}
        </div>
      </aside>
    );
  }

  // 📱 모바일 Drawer
  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* 사이드 슬라이드 메뉴 */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-[#0d1117] border-r border-gray-800 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-100">
            Learn<span className="text-violet-400">JS</span>
          </span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        {content}
      </div>
    </>
  );
}
