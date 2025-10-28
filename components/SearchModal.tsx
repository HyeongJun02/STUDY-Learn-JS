"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command, Search } from "lucide-react";
import menuData from "@/data/menuData";

export default function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // ESC로 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // 메뉴 검색
  const results = menuData.flatMap((section) =>
    section.items
      .filter((item) =>
        (section.title + item).toLowerCase().includes(query.toLowerCase())
      )
      .map((item) => ({
        name: `${section.title} → ${item}`,
        href: `/${section.title.toLowerCase()}/${item.toLowerCase()}`,
      }))
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#161b22] border border-gray-700 rounded-lg shadow-lg p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Search size={16} className="text-gray-500" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search JS syntax…"
            className="w-full bg-transparent outline-none text-gray-100 placeholder-gray-500 text-sm"
          />
        </div>

        <div className="max-h-64 overflow-y-auto mt-2">
          {results.length > 0 ? (
            results.map((r) => (
              <div
                key={r.href}
                onClick={() => {
                  router.push(r.href);
                  onClose();
                }}
                className="px-3 py-2 rounded-md cursor-pointer text-gray-300 hover:bg-[#1f2937] hover:text-[#58a6ff] transition"
              >
                {r.name}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm px-3 py-2">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
