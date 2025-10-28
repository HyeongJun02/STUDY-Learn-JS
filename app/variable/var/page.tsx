"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function VarPage() {
  const [code, setCode] = useState(
    `console.log(a); // undefined (호이스팅)\nvar a = 10;\nconsole.log(a);`
  );
  const [output, setOutput] = useState("");

  const runCode = () => setOutput(executeJS(code));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">var 키워드</h1>
      <p className="text-gray-400 leading-relaxed">
        <code>var</code>는 ES6 이전부터 사용되던 변수 선언 방식으로, **함수
        스코프(function scope)**를 가집니다. 호이스팅(hoisting)으로 인해 선언
        전에 접근이 가능하지만, 이는 혼란을 유발할 수 있습니다.
      </p>

      <ul className="list-disc ml-6 text-gray-400">
        <li>⚙️ 재선언 가능, 재할당 가능</li>
        <li>🌀 함수 스코프 (if, for 블록 무시됨)</li>
        <li>⚠️ 호이스팅 발생 → 선언 전에 undefined로 접근 가능</li>
      </ul>

      <div className="mt-4">
        <MonacoEditor
          height="120px"
          defaultLanguage="javascript"
          value={code}
          onChange={(v) => setCode(v || "")}
          theme="vs-dark"
        />
        <button
          onClick={runCode}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400"
        >
          실행 ▶
        </button>

        <pre className="bg-black text-green-300 p-3 rounded mt-3 min-h-[100px] overflow-auto">
          {output}
        </pre>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">💡 왜 var는 피해야 할까?</h2>
        <ul className="list-disc ml-6 text-gray-400">
          <li>같은 이름으로 여러 번 선언되어 의도치 않은 덮어쓰기 발생</li>
          <li>블록 스코프 무시로 로직 혼란 초래</li>
          <li>
            현대 자바스크립트에서는 <code>let</code> 또는 <code>const</code>를
            권장
          </li>
        </ul>
      </section>
    </div>
  );
}
