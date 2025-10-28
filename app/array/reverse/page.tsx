"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function ReversePage() {
  // 예제 1 — 기본 동작
  const [code1, setCode1] = useState(
    `// 기본 동작: 원본 배열 자체를 뒤집음 (in-place)
const a = [1,2,3,4];
const r = a.reverse();
console.log("r:", r);        // [4,3,2,1]
console.log("a === r:", a === r); // true (같은 배열)`
  );
  const [output1, setOutput1] = useState("");

  // 예제 2 — 원본 보존
  const [code2, setCode2] = useState(
    `// 원본 보존하고 싶을 때: 얕은 복사 후 reverse
const b = [1,2,3,4];
const r2 = [...b].reverse();
console.log("b:", b);        // [1,2,3,4]
console.log("r2:", r2);      // [4,3,2,1]`
  );
  const [output2, setOutput2] = useState("");

  // 예제 3 — 희소 배열
  const [code3, setCode3] = useState(
    `// 희소 배열(sparse array) 주의: 빈 슬롯은 그대로 유지
const s = [0, , 2, , 4];
console.log("before:", s, s.hasOwnProperty(1), s.hasOwnProperty(3));
s.reverse();
console.log("after :", s, s.hasOwnProperty(1), s.hasOwnProperty(3));`
  );
  const [output3, setOutput3] = useState("");

  // 예제 4 — 객체 참조
  const [code4, setCode4] = useState(
    `// 객체 요소의 얕은 복사(shallow)
const users = [{n:"A"}, {n:"B"}];
const usersRev = users.reverse();
usersRev[0].n = "Z";
console.log(users[0].n); // "Z" (같은 객체 참조라 내부 값은 공유됨)`
  );
  const [output4, setOutput4] = useState("");

  const run1 = () => setOutput1(executeJS(code1));
  const run2 = () => setOutput2(executeJS(code2));
  const run3 = () => setOutput3(executeJS(code3));
  const run4 = () => setOutput4(executeJS(code4));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Array.prototype.reverse()</h1>

      <p className="text-gray-400 leading-relaxed">
        <code>reverse()</code>는 배열의 요소 순서를 <b>역순</b>으로 바꾸며,
        <b>원본 배열을 직접 변경(in-place)</b>합니다.
      </p>

      <ul className="list-disc ml-6 text-gray-400 space-y-1">
        <li>
          반환값: <code>this</code> (같은 배열 참조)
        </li>
        <li>시간 복잡도: O(n)</li>
        <li>메모리: O(1) (in-place)</li>
        <li>객체 내부 참조는 그대로 유지</li>
        <li>희소 배열의 빈 슬롯은 그대로 유지</li>
      </ul>

      {/* 예제 1 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🎯 기본 동작</h2>
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
        <h2 className="text-lg font-semibold mb-2">🧩 원본 보존 방법</h2>
        <MonacoEditor
          height="140px"
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
        <h2 className="text-lg font-semibold mb-2">💡 희소 배열</h2>
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

      {/* 예제 4 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🪄 얕은 복사 주의</h2>
        <MonacoEditor
          height="160px"
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

      {/* 실무 팁 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">✅ 실무 팁</h2>
        <ul className="list-disc ml-6 text-gray-400 space-y-1">
          <li>
            원본 보존 시 <code>[...arr].reverse()</code> 또는{" "}
            <code>arr.toReversed()</code> 사용
          </li>
          <li>
            정렬과 함께: <code>[...arr].sort(...).reverse()</code>
          </li>
          <li>최신순 UI, 로그 등에서 자주 활용</li>
        </ul>
      </section>
    </div>
  );
}
