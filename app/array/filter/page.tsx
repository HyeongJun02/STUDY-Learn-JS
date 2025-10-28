"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function FilterPage() {
  // 예제 1
  const [code1, setCode1] = useState(
    `// 기본: 조건을 만족하는 요소만 남김
const arr = [10, 25, 40, 55];
const over30 = arr.filter(n => n > 30);
console.log(over30); // [40, 55]`
  );
  const [output1, setOutput1] = useState("");

  // 예제 2
  const [code2, setCode2] = useState(
    `// 객체 배열 필터링
const users = [
  { name: "Kim", active: true },
  { name: "Lee", active: false },
  { name: "Park", active: true }
];
const activeUsers = users.filter(u => u.active);
console.log(activeUsers);`
  );
  const [output2, setOutput2] = useState("");

  // 예제 3
  const [code3, setCode3] = useState(
    `// filter + includes 조합
const words = ["apple","banana","grape","apricot"];
const result = words.filter(w => w.includes("ap"));
console.log(result); // ["apple","grape","apricot"]`
  );
  const [output3, setOutput3] = useState("");

  const run1 = () => setOutput1(executeJS(code1));
  const run2 = () => setOutput2(executeJS(code2));
  const run3 = () => setOutput3(executeJS(code3));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Array.prototype.filter()</h1>

      <p className="text-gray-400 leading-relaxed">
        <code>filter()</code>는 주어진 조건을 만족하는 요소만 남기며,{" "}
        <b>새 배열</b>을 반환합니다. 원본 배열은 변경되지 않습니다.
      </p>

      {/* 예제 1 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🎯 기본 사용법</h2>
        <MonacoEditor
          height="140px"
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
        <h2 className="text-lg font-semibold mb-2">🧩 객체 배열 필터링</h2>
        <MonacoEditor
          height="160px"
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
        <h2 className="text-lg font-semibold mb-2">💡 문자열 조건 조합</h2>
        <MonacoEditor
          height="160px"
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

      {/* 실무 팁 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">✅ 실무 팁</h2>
        <ul className="list-disc ml-6 text-gray-400 space-y-1">
          <li>항상 새 배열 반환 (원본 불변)</li>
          <li>조건이 false인 요소는 제거됨</li>
          <li>빈 배열이면 결과도 빈 배열</li>
          <li>
            <code>filter(Boolean)</code> → falsy 값 제거에 자주 사용
          </li>
        </ul>
      </section>
    </div>
  );
}
