"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function SplitPage() {
  // 예제 1 — 기본 분할
  const [code1, setCode1] = useState(
    `// 기본: 구분자(separator)를 기준으로 문자열을 나눠 배열을 반환
const s = "apple,banana, cherry";
console.log(s.split(","));`
  );
  const [output1, setOutput1] = useState("");

  // 예제 2 — 공백 제거
  const [code2, setCode2] = useState(
    `// 공백 제거와 함께
const s = "apple, banana, cherry";
console.log(s.split(",").map(x => x.trim()));`
  );
  const [output2, setOutput2] = useState("");

  // 예제 3 — 정규식 분할
  const [code3, setCode3] = useState(
    `// 정규식 분할: 공백 여러 개를 기준으로
const str = "a   b \t c";
console.log(str.split(/\\s+/));`
  );
  const [output3, setOutput3] = useState("");

  // 예제 4 — 캡처 그룹
  const [code4, setCode4] = useState(
    `// 정규식 캡처 그룹이 있으면, 그룹 문자열도 결과에 포함
console.log("2025-10-28".split(/(-)/));`
  );
  const [output4, setOutput4] = useState("");

  // 예제 5 — 실무 예시
  const [code5, setCode5] = useState(
    `// CSV의 숫자열 파싱
const csv = "10,20, 30";
const nums = csv.split(",").map(x => Number(x.trim()));
console.log(nums);`
  );
  const [output5, setOutput5] = useState("");

  const run1 = () => setOutput1(executeJS(code1));
  const run2 = () => setOutput2(executeJS(code2));
  const run3 = () => setOutput3(executeJS(code3));
  const run4 = () => setOutput4(executeJS(code4));
  const run5 = () => setOutput5(executeJS(code5));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">String.prototype.split()</h1>

      <p className="text-gray-400 leading-relaxed">
        <code>split(separator?, limit?)</code>는 문자열을 <b>구분자</b>로 나눠{" "}
        <b>배열</b>을 반환합니다.
      </p>

      {/* 예제 1 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🎯 기본 사용법</h2>
        <MonacoEditor
          height="120px"
          defaultLanguage="javascript"
          value={code1}
          onChange={(v) => setCode1(v || "")}
          theme="vs-dark"
        />
        <button
          onClick={run1}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400"
        >
          ▶ 실행
        </button>
        <pre className="bg-black text-green-300 p-3 rounded mt-2 min-h-[100px] overflow-auto">
          {output1}
        </pre>
      </section>

      {/* 예제 2 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🧩 trim()과 조합</h2>
        <MonacoEditor
          height="120px"
          defaultLanguage="javascript"
          value={code2}
          onChange={(v) => setCode2(v || "")}
          theme="vs-dark"
        />
        <button
          onClick={run2}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400"
        >
          ▶ 실행
        </button>
        <pre className="bg-black text-green-300 p-3 rounded mt-2 min-h-[100px] overflow-auto">
          {output2}
        </pre>
      </section>

      {/* 예제 3 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">💡 정규식 분할</h2>
        <MonacoEditor
          height="120px"
          defaultLanguage="javascript"
          value={code3}
          onChange={(v) => setCode3(v || "")}
          theme="vs-dark"
        />
        <button
          onClick={run3}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400"
        >
          ▶ 실행
        </button>
        <pre className="bg-black text-green-300 p-3 rounded mt-2 min-h-[100px] overflow-auto">
          {output3}
        </pre>
      </section>

      {/* 예제 4 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🔍 캡처 그룹 포함</h2>
        <MonacoEditor
          height="120px"
          defaultLanguage="javascript"
          value={code4}
          onChange={(v) => setCode4(v || "")}
          theme="vs-dark"
        />
        <button
          onClick={run4}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400"
        >
          ▶ 실행
        </button>
        <pre className="bg-black text-green-300 p-3 rounded mt-2 min-h-[100px] overflow-auto">
          {output4}
        </pre>
      </section>

      {/* 예제 5 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🏢 실무 예시 (CSV 파싱)</h2>
        <MonacoEditor
          height="140px"
          defaultLanguage="javascript"
          value={code5}
          onChange={(v) => setCode5(v || "")}
          theme="vs-dark"
        />
        <button
          onClick={run5}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400"
        >
          ▶ 실행
        </button>
        <pre className="bg-black text-green-300 p-3 rounded mt-2 min-h-[100px] overflow-auto">
          {output5}
        </pre>
      </section>

      {/* 실무 팁 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">✅ 실무 팁</h2>
        <ul className="list-disc ml-6 text-gray-400 space-y-1">
          <li>
            연속된 구분자는 빈 문자열 요소 생성 (<code>"a,,b"</code> → ["a", "",
            "b"])
          </li>
          <li>
            정규식 <code>/\\s+/</code> → 다양한 공백 문자 대응
          </li>
          <li>
            숫자 변환 시 <code>.map(Number)</code> + <code>trim()</code>
          </li>
          <li>
            복잡한 CSV는 <code>csv-parse</code> 같은 라이브러리 추천
          </li>
        </ul>
      </section>
    </div>
  );
}
