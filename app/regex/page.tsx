"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

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

  useEffect(() => {
    if (!regexSource) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const re = new RegExp(regexSource, flags);
      let foundMatches: MatchDetail[] = [];

      if (flags.includes("g")) {
        const results = Array.from(testText.matchAll(re));
        foundMatches = results.map((m) => ({
          fullMatch: m[0],
          index: m.index ?? 0,
          groups: m.slice(1),
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
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">정규표현식(Regex) 테스트</h1>
      <p className="text-gray-400 leading-relaxed">
        정규표현식은 특정한 규칙을 가진 문자열의 집합을 표현하는 데 사용하는{" "}
        <b>형식 언어</b>입니다. 패턴과 텍스트를 입력하면 실시간으로 매칭 결과를
        확인할 수 있습니다.
      </p>

      <ul className="list-disc ml-6 text-gray-400">
        <li>
          🔍 <code>/패턴/플래그</code> 형태로 사용됩니다.
        </li>
        <li>
          ⚡ 괄호 <code>()</code>를 사용하면 캡처 그룹(Group)을 분리해낼 수
          있습니다.
        </li>
        <li>
          🛠️ 자주 사용되는 문법: <code>^</code>(시작), <code>$</code>(끝),{" "}
          <code>\d</code>(숫자), <code>+</code>(1개 이상)
        </li>
      </ul>

      <div className="mt-4 flex flex-col gap-4">
        {/* 1. 정규식 입력 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">1. 패턴 (Pattern)</h2>
          <div className="flex gap-2 items-center bg-[#1e1e1e] p-2 rounded border border-gray-700">
            <span className="text-gray-500 text-lg font-bold pl-2">/</span>
            <input
              type="text"
              value={regexSource}
              onChange={(e) => setRegexSource(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-blue-400 font-mono"
              placeholder="패턴을 입력하세요 (예: \d+)"
              spellCheck="false"
            />
            <span className="text-gray-500 text-lg font-bold">/</span>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-16 bg-transparent border-none outline-none text-yellow-400 font-mono text-center"
              placeholder="gmi"
              spellCheck="false"
            />
          </div>
          {error && <p className="text-red-400 text-sm mt-2">⚠️ {error}</p>}
        </div>

        {/* 2. 텍스트 입력 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            2. 테스트 문자열 (String)
          </h2>
          <div className="border border-gray-700 rounded overflow-hidden">
            <MonacoEditor
              height="150px"
              defaultLanguage="plaintext"
              theme="vs-dark"
              value={testText}
              onChange={(v) => setTestText(v || "")}
              options={{
                minimap: { enabled: false },
                lineNumbers: "on",
                fontSize: 14,
                wordWrap: "on",
              }}
            />
          </div>
        </div>

        {/* 3. 결과 출력 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">3. 매칭 결과 (Output)</h2>
          <div className="bg-black text-green-300 p-4 rounded min-h-[120px] overflow-auto flex flex-col gap-3 font-mono text-sm border border-gray-800">
            {matches.length > 0 ? (
              matches.map((m, i) => (
                <div
                  key={i}
                  className="border-b border-green-900/50 pb-2 last:border-0 last:pb-0"
                >
                  <div className="text-white mb-1">
                    <span className="text-green-500 mr-2">[{i + 1}]</span>
                    {m.fullMatch}
                  </div>
                  {m.groups.length > 0 && (
                    <div className="ml-6 flex flex-col gap-1 text-green-600">
                      {m.groups.map((g, gIdx) => (
                        <div key={gIdx}>
                          <span className="opacity-70">Group {gIdx + 1}: </span>
                          <span className="text-green-400">
                            {g !== undefined ? g : "undefined"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <span className="text-gray-600 italic">
                매칭된 결과가 없습니다.
              </span>
            )}
          </div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">💡 요약</h2>
        <p className="text-gray-400">
          <b>g 플래그</b>를 사용하면 문자열 전체에서 일치하는 모든 항목을 찾고,
          생략하면 첫 번째 매칭 결과만 반환합니다. 괄호로 묶인 부분은{" "}
          <b>Group</b>으로 따로 추출되어 유용하게 활용할 수 있습니다.
        </p>
      </section>
    </div>
  );
}
