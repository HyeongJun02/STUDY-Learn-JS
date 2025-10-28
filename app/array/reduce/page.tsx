"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function ReducePage() {
  // 예제 1
  const [code1, setCode1] = useState(
    `// 기본: 합계 구하기
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 15`
  );
  const [output1, setOutput1] = useState("");

  // 예제 2
  const [code2, setCode2] = useState(
    `// 배열 -> 객체로 변환
const fruits = ["apple","banana","apple","orange","banana"];
const count = fruits.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 2, banana: 2, orange: 1 }`
  );
  const [output2, setOutput2] = useState("");

  // 예제 3
  const [code3, setCode3] = useState(
    `// 다중 배열 평탄화
const nested = [[1,2],[3,4],[5]];
const flat = nested.reduce((acc, cur) => acc.concat(cur), []);
console.log(flat); // [1,2,3,4,5]`
  );
  const [output3, setOutput3] = useState("");

  const run1 = () => setOutput1(executeJS(code1));
  const run2 = () => setOutput2(executeJS(code2));
  const run3 = () => setOutput3(executeJS(code3));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Array.prototype.reduce()</h1>

      <p className="text-gray-400 leading-relaxed">
        <code>reduce()</code>는 누산기(<code>acc</code>)를 사용해 배열의 모든
        요소를 하나의 값으로 줄이는 메서드입니다. 합계, 그룹화, 통계 처리 등에
        매우 유용합니다.
      </p>

      {/* 예제 1 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🎯 합계 구하기</h2>
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
        <h2 className="text-lg font-semibold mb-2">🍎 배열을 객체로 변환</h2>
        <MonacoEditor
          height="180px"
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
        <h2 className="text-lg font-semibold mb-2">🧩 배열 평탄화</h2>
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
          <li>항상 초기값을 지정해 안전하게 처리</li>
          <li>map/filter를 조합한 복잡한 로직을 단순화 가능</li>
          <li>데이터 집계, 그룹핑, 평탄화, 카운트 등 다양한 활용 가능</li>
          <li>
            <code>reduceRight()</code>은 반대 방향으로 순회
          </li>
        </ul>
      </section>
    </div>
  );
}
