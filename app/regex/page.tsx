"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Monaco Editor를 클라이언트 사이드에서만 로드
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

// 매칭 결과의 타입을 구체적으로 정의
type MatchDetail = {
  fullMatch: string;
  index: number;
  groups: string[];
};

export default function RegexPracticePage() {
  const [regexSource, setRegexSource] = useState(
    "([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})",
  );
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState(
    "contact us at support@example.com or hello@world.net",
  );
  const [matches, setMatches] = useState<MatchDetail[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 패턴이나 텍스트가 바뀔 때마다 실시간으로 매칭 결과 업데이트
  useEffect(() => {
    if (!regexSource) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const re = new RegExp(regexSource, flags);
      let foundMatches: MatchDetail[] = [];

      // 플래그에 'g'가 있으면 matchAll을, 없으면 match를 사용해야 에러가 안 납니다.
      if (flags.includes("g")) {
        const results = Array.from(testText.matchAll(re));
        foundMatches = results.map((m) => ({
          fullMatch: m[0],
          index: m.index ?? 0,
          groups: m.slice(1), // 1번 인덱스부터가 캡처 그룹
        }));
      } else {
        const m = testText.match(re);
        if (m) {
          foundMatches = [
            {
              fullMatch: m[0],
              index: m.index ?? 0,
              groups: m.slice(1),
            },
          ];
        }
      }

      setMatches(foundMatches);
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("유효하지 않은 정규표현식입니다.");
      setMatches([]);
    }
  }, [regexSource, flags, testText]);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto p-6 text-gray-200">
      {/* 헤더 섹션 */}
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold">Regex Tester</h1>
        <p className="text-gray-400 leading-relaxed">
          정규표현식 패턴을 작성하고 실시간으로 캡처 그룹과 매칭 결과를
          확인하세요.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1. 정규식 입력 영역 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Regular Expression
          </label>
          <div
            className={`flex items-center bg-[#1e1e1e] rounded-lg border focus-within:ring-2 focus-within:ring-blue-500/50 transition-all ${
              error ? "border-red-500/50" : "border-gray-700"
            }`}
          >
            <span className="px-4 py-3 text-gray-500 text-lg border-r border-gray-800 font-bold">
              /
            </span>
            <input
              type="text"
              value={regexSource}
              onChange={(e) => setRegexSource(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3 outline-none text-blue-400 font-mono text-lg"
              placeholder="패턴을 입력하세요 (예: [0-9]+)"
              spellCheck="false"
            />
            <span className="px-4 py-3 text-gray-500 text-lg border-l border-r border-gray-800 font-bold">
              /
            </span>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-20 bg-transparent px-3 py-3 outline-none text-yellow-400 font-mono text-lg text-center"
              placeholder="gmi"
              spellCheck="false"
            />
          </div>
          {error && <p className="text-red-400 text-sm mt-1">⚠️ {error}</p>}
        </div>

        {/* 2. 테스트 문자열 입력 영역 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Test String
          </label>
          <div className="border border-gray-700 rounded-lg overflow-hidden shadow-inner">
            <MonacoEditor
              height="200px"
              defaultLanguage="plaintext"
              theme="vs-dark"
              value={testText}
              onChange={(v) => setTestText(v || "")}
              options={{
                minimap: { enabled: false },
                lineNumbers: "on",
                fontSize: 15,
                wordWrap: "on",
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </div>

        {/* 3. 매칭 결과 출력 영역 (디테일 뷰) */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Match Information
            </label>
            <span className="text-xs text-gray-500">
              {matches.length} matches found
            </span>
          </div>

          <div className="bg-[#121212] rounded-lg min-h-[150px] border border-gray-800 p-4">
            {matches.length > 0 ? (
              <div className="flex flex-col gap-4">
                {matches.map((m, i) => (
                  <div
                    key={i}
                    className="bg-[#1e1e1e] border border-gray-700 rounded-md overflow-hidden"
                  >
                    {/* 전체 매치 */}
                    <div className="bg-blue-900/20 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
                      <div className="font-mono">
                        <span className="text-blue-400 text-sm mr-3">
                          Match {i + 1}
                        </span>
                        <span className="text-white text-lg">
                          {m.fullMatch}
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs">
                        Index: {m.index}-{m.index + m.fullMatch.length}
                      </span>
                    </div>

                    {/* 캡처 그룹 */}
                    {m.groups.length > 0 && (
                      <div className="px-4 py-3 flex flex-col gap-2 bg-[#181818]">
                        {m.groups.map((group, gIdx) => (
                          <div
                            key={gIdx}
                            className="flex items-center text-sm font-mono"
                          >
                            <span className="text-green-400 w-20 shrink-0">
                              Group {gIdx + 1}
                            </span>
                            <span className="text-gray-300 bg-gray-800 px-2 py-0.5 rounded break-all">
                              {group !== undefined ? (
                                group
                              ) : (
                                <span className="text-gray-600 italic">
                                  undefined
                                </span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-600 italic">
                매칭된 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
