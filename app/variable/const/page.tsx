"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function ConstPage() {
  const [code, setCode] = useState(
    `const PI = 3.14;\nconsole.log(PI);\n// PI = 3.1415; // ❌ TypeError 발생`
  );
  const [output, setOutput] = useState("");

  const runCode = () => setOutput(executeJS(code));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">const 키워드</h1>
      <p className="text-gray-400 leading-relaxed">
        <code>const</code>는 <b>상수(constant)</b>를 선언할 때 사용하며, 선언 시
        반드시 초기화해야 합니다. 재할당이 불가능하지만, 객체나 배열의 내부
        내용은 변경할 수 있습니다.
      </p>

      <ul className="list-disc ml-6 text-gray-400">
        <li>⚙️ 재선언 불가, 재할당 불가</li>
        <li>📦 블록 스코프</li>
        <li>💾 선언과 동시에 초기화 필수</li>
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
        <h2 className="text-lg font-semibold mb-2">💡 헷갈리기 쉬운 포인트</h2>
        <ul className="list-disc ml-6 text-gray-400">
          <li>
            객체나 배열을 <code>const</code>로 선언해도 내부 값은 바꿀 수
            있습니다.
            <pre className="bg-gray-100 text-sm p-2 mt-1 rounded">
              {`const arr = [1, 2, 3];
arr.push(4); // ✅ 가능
arr = [1, 2, 3, 4]; // ❌ TypeError`}
            </pre>
          </li>
          <li>
            불변 데이터 구조(immutability)가 필요할 땐 Object.freeze() 같은
            방법을 사용하세요.
          </li>
        </ul>
      </section>
    </div>
  );
}
