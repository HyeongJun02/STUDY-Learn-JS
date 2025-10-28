"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import menuData from "@/data/menuData";
import { Search } from "lucide-react";

export default function Sidebar() {
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  // 섹션과 아이템을 모두 대상으로 필터링
  const filtered = menuData
    .map((section) => {
      const matchedItems = section.items.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
      const matchSectionTitle = section.title
        .toLowerCase()
        .includes(search.toLowerCase());
      if (matchSectionTitle || matchedItems.length > 0) {
        return {
          ...section,
          items: matchSectionTitle ? section.items : matchedItems,
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <aside className="w-64 bg-[#161b22] border-r border-gray-700 flex flex-col text-gray-300">
      {/* 검색창 */}
      <div className="relative p-4">
        <Search
          size={16}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#0e1117] border border-gray-700 text-gray-100 pl-8 pr-3 py-2 rounded 
                     focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 메뉴 리스트 */}
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {filtered.map((section) => (
          <details key={section!.title} open>
            <summary className="cursor-pointer select-none font-semibold text-gray-100 hover:text-[#58a6ff] mb-1 mt-1">
              {section!.title}
            </summary>
            <ul className="ml-3 space-y-1">
              {section!.items.map((item) => {
                const href = `/${section!.title.toLowerCase()}/${item.toLowerCase()}`;
                const isActive = pathname === href;
                return (
                  <li key={item}>
                    <a
                      href={href}
                      className={`relative block text-sm px-2 py-1 rounded-md transition-colors duration-150
                        ${
                          isActive
                            ? "text-[#58a6ff] font-medium bg-[#1f2937]"
                            : "text-gray-400 hover:text-[#58a6ff]"
                        }`}
                    >
                      {/* 왼쪽 파란 바 애니메이션 */}
                      <span
                        className={`absolute left-0 top-0 h-full w-[3px] rounded-r-sm bg-[#58a6ff] transition-all duration-200 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      ></span>
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </nav>
    </aside>
  );
}
