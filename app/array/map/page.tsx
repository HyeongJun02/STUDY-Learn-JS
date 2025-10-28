"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function MapPage() {
  // 각 예제별 코드 / 출력 상태
  const [code1, setCode1] = useState(
    `const arr = [1, 2, 3, 4];
const doubled = arr.map(x => x * 2);
console.log(doubled);`
  );
  const [output1, setOutput1] = useState("");

  const [code2, setCode2] = useState(
    `const users = [
  { name: "Kim", age: 20 },
  { name: "Lee", age: 25 },
  { name: "Park", age: 30 }
];
const names = users.map(u => u.name);
console.log(names);`
  );
  const [output2, setOutput2] = useState("");

  const [code3, setCode3] = useState(
    `const nums = [1,2,3,4,5];
const labeled = nums.map(n => n % 2 === 0 ? "짝수" : "홀수");
console.log(labeled);`
  );
  const [output3, setOutput3] = useState("");

  const run1 = () => setOutput1(executeJS(code1));
  const run2 = () => setOutput2(executeJS(code2));
  const run3 = () => setOutput3(executeJS(code3));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Array.prototype.map()</h1>
      <p className="text-gray-400 leading-relaxed">
        <code>map()</code>은 배열의 각 요소를 변환하여 새 배열을 생성하는
        메서드입니다.
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
        <h2 className="text-lg font-semibold mb-2">🧩 객체 배열 다루기</h2>
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
        <h2 className="text-lg font-semibold mb-2">💡 조건 분기 응용</h2>
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
          <li>
            <b>map()</b>은 원본 배열을 절대 바꾸지 않음
          </li>
          <li>콜백 반환값으로 새 배열 생성</li>
          <li>
            <code>forEach()</code>와 달리 <b>결과를 리턴</b>함
          </li>
        </ul>
      </section>
    </div>
  );
}
