"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function SortPage() {
  // 예제 1 — 기본 (문자열 기준)
  const [code1, setCode1] = useState(
    `// 기본 동작: 문자열(UTF-16) 코드 순으로 정렬
const fruits = ["banana", "apple", "cherry"];
console.log(fruits.sort()); // ["apple", "banana", "cherry"]

// 대문자 < 소문자
const words = ["Zebra", "apple", "Orange"];
console.log(words.sort()); // ["Orange", "Zebra", "apple"]`
  );
  const [output1, setOutput1] = useState("");

  // 예제 2 — 숫자 정렬의 함정
  const [code2, setCode2] = useState(
    `// 숫자 비교시 주의! 문자열 비교가 기본이라 이상하게 정렬됨
const nums = [100, 5, 20, 300];
console.log(nums.sort()); // [100, 20, 300, 5]

// compareFn 사용 시 해결
console.log(nums.sort((a, b) => a - b)); // [5, 20, 100, 300]`
  );
  const [output2, setOutput2] = useState("");

  // 예제 3 — 객체 정렬
  const [code3, setCode3] = useState(
    `// 객체 배열 정렬
const users = [
  { name: "Kim", age: 30 },
  { name: "Lee", age: 22 },
  { name: "Park", age: 25 }
];

// 나이 기준 오름차순
users.sort((a, b) => a.age - b.age);
console.log(users);

// 이름 기준 (문자열 비교)
users.sort((a, b) => a.name.localeCompare(b.name));
console.log(users);`
  );
  const [output3, setOutput3] = useState("");

  // 예제 4 — localeCompare (국가별 언어 정렬)
  const [code4, setCode4] = useState(
    `// localeCompare를 사용하면 언어 규칙 기반 정렬 가능
const names = ["홍길동", "김철수", "이영희"];
console.log(names.sort((a, b) => a.localeCompare(b, "ko")));`
  );
  const [output4, setOutput4] = useState("");

  // 예제 5 — 안정 정렬 (stable sort)
  const [code5, setCode5] = useState(
    `// ES2019부터 sort()는 'stable sort'
// 즉, 비교 결과가 같을 때 원래 순서 유지
const items = [
  { type: "fruit", name: "apple" },
  { type: "fruit", name: "banana" },
  { type: "vegetable", name: "carrot" },
  { type: "fruit", name: "cherry" }
];
items.sort((a, b) => a.type.localeCompare(b.type));
console.log(items);`
  );
  const [output5, setOutput5] = useState("");

  const run1 = () => setOutput1(executeJS(code1));
  const run2 = () => setOutput2(executeJS(code2));
  const run3 = () => setOutput3(executeJS(code3));
  const run4 = () => setOutput4(executeJS(code4));
  const run5 = () => setOutput5(executeJS(code5));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Array.prototype.sort()</h1>

      <p className="text-gray-400 leading-relaxed">
        <code>sort(compareFn?)</code>은 배열 요소를 정렬합니다.
        <b>원본 배열을 직접 변경(in-place)</b>하며, 기본 비교는{" "}
        <b>문자열(UTF-16 코드 순)</b> 기준입니다.
      </p>

      <ul className="list-disc ml-6 text-gray-400 space-y-1">
        <li>기본 정렬: 문자열 기준 ("2" &lt; "10")</li>
        <li>
          숫자 정렬 시 <code>compareFn</code>을 반드시 사용
        </li>
        <li>
          객체 배열 정렬 시 <code>localeCompare</code> 또는 비교식 사용
        </li>
        <li>ES2019+ 부터는 안정 정렬 (stable sort)</li>
        <li>시간 복잡도: O(n log n), 메모리: O(log n) ~ O(n)</li>
      </ul>

      {/* 예제 1 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🎯 기본 문자열 정렬</h2>
        <MonacoEditor
          height="160px"
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
        <h2 className="text-lg font-semibold mb-2">💡 숫자 정렬의 함정</h2>
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
        <h2 className="text-lg font-semibold mb-2">🧩 객체 배열 정렬</h2>
        <MonacoEditor
          height="200px"
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
        <pre className="bg-black text-green-300 p-3 rounded mt-2 min-h-[120px] overflow-auto">
          {output3}
        </pre>
      </section>

      {/* 예제 4 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🌏 localeCompare 정렬</h2>
        <MonacoEditor
          height="140px"
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
        <h2 className="text-lg font-semibold mb-2">
          🪄 안정 정렬 (Stable Sort)
        </h2>
        <MonacoEditor
          height="180px"
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
        <pre className="bg-black text-green-300 p-3 rounded mt-2 min-h-[120px] overflow-auto">
          {output5}
        </pre>
      </section>

      {/* 실무 팁 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">✅ 실무 팁</h2>
        <ul className="list-disc ml-6 text-gray-400 space-y-1">
          <li>
            정렬 시 <b>원본 배열 변경됨</b> — 필요 시 복사 후 정렬:{" "}
            <code>[...arr].sort()</code>
          </li>
          <li>
            문자열 정렬 시 대소문자/언어 환경 고려 →{" "}
            <code>localeCompare()</code>
          </li>
          <li>
            숫자 비교는 항상 <code>a - b</code> 또는 <code>b - a</code>
          </li>
          <li>내부 알고리즘은 V8 기준 TimSort (Hybrid Stable Sort)</li>
          <li>O(n log n) 성능이지만 compareFn이 복잡하면 병목 발생 가능</li>
        </ul>
      </section>
    </div>
  );
}
