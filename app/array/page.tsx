"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function ArrayPage() {
  const [code, setCode] = useState(
    `const fruits = ["apple", "banana", "cherry"];\nconsole.log(fruits);\nconsole.log(fruits[1]); // banana`
  );
  const [output, setOutput] = useState("");

  const runCode = () => setOutput(executeJS(code));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Array (배열)</h1>

      <p className="text-gray-400 leading-relaxed">
        <code>Array</code>는 여러 데이터를 순서대로 저장할 수 있는 **객체형
        데이터 구조**입니다. 인덱스를 통해 각 요소에 접근하며, 다양한 내장
        메서드로 데이터를 조작할 수 있습니다.
      </p>

      <ul className="list-disc ml-6 text-gray-400">
        <li>📦 순서가 있는 데이터 집합 (인덱스는 0부터 시작)</li>
        <li>🔢 문자열, 숫자, 객체 등 모든 타입 저장 가능</li>
        <li>🧩 다양한 내장 메서드 지원 (map, filter, reduce 등)</li>
      </ul>

      <div className="mt-4">
        <MonacoEditor
          height="160px"
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
        <h2 className="text-lg font-semibold mb-2">💡 주요 메서드 예시</h2>
        <ul className="list-disc ml-6 text-gray-400">
          <li>
            <code>reverse()</code> — 배열의 순서를 뒤집습니다.
          </li>
          <li>
            <code>map()</code> — 각 요소에 함수를 적용한 결과로 새로운 배열을
            만듭니다.
          </li>
          <li>
            <code>filter()</code> — 조건을 만족하는 요소만 모아 새로운 배열을
            만듭니다.
          </li>
          <li>
            <code>reduce()</code> — 배열을 누적하여 하나의 값으로 줄입니다.
          </li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">📚 예제</h2>
        <p className="text-gray-400">
          아래 코드를 실행하면 배열 선언과 인덱스 접근 결과를 확인할 수
          있습니다.
        </p>
      </section>
    </div>
  );
}
