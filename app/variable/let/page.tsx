"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function LetPage() {
  const [code, setCode] = useState(
    `let x = 10;\nconsole.log(x);\nx = 20;\nconsole.log(x);`
  );
  const [output, setOutput] = useState("");

  const runCode = () => setOutput(executeJS(code));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">let 키워드</h1>
      <p className="text-gray-400 leading-relaxed">
        <code>let</code>은 **블록 스코프(block scope)**를 가지며, 같은 블록
        안에서 중복 선언이 불가능합니다. 하지만 재할당은 가능합니다.
      </p>

      <ul className="list-disc ml-6 text-gray-400">
        <li>⚙️ 재선언 불가, 재할당 가능</li>
        <li>📦 블록 스코프 (if, for 내부 등에서도 독립적)</li>
        <li>
          🚫 선언 전에 접근하면 <code>ReferenceError</code> 발생 (TDZ)
        </li>
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
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          실행 ▶
        </button>

        <pre className="bg-black text-green-300 p-3 rounded mt-3 min-h-[100px] overflow-auto">
          {output}
        </pre>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">💡 요약</h2>
        <p className="text-gray-400">
          <code>let</code>은 주로 **값이 변하는 변수**를 선언할 때 사용합니다.
          상수처럼 고정되지 않은 데이터(예: 카운터, 루프 변수 등)에 적합합니다.
        </p>
      </section>
    </div>
  );
}
