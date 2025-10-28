"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const examples = [
  {
    title: "🎨 Fun with Arrays",
    code: `const animals = ["🐶", "🐱", "🐸", "🦊"];
const sounds = ["Woof!", "Meow!", "Ribbit!", "Yip!"];
animals.map((a, i) => console.log(\`\${a} says \${sounds[i]}\`));`,
  },
  {
    title: "🧩 Object Destructuring",
    code: `const user = { name: "Aodwns", lang: "JavaScript", level: "🔥 Master" };
const { name, lang, level } = user;
console.log(\`Hello \${name}! Welcome to \${lang}. Level: \${level}\`);`,
  },
  {
    title: "⚙️ Spread & Rest",
    code: `const arr1 = [1,2,3];
const arr2 = [...arr1, 4, 5];
console.log("Spread:", arr2);

function sum(...nums) {
  return nums.reduce((a,b)=>a+b,0);
}
console.log("Rest:", sum(1,2,3,4,5));`,
  },
  {
    title: "🪄 Template Literals",
    code: `const name = "JS";
const mood = "✨ exciting";
console.log(\`Learning \${name} is \${mood}!\`);`,
  },
  {
    title: "🎲 Math.random()",
    code: `const n = Math.floor(Math.random()*10);
console.log("🎯 Random number:", n);`,
  },
  {
    title: "🧠 Higher-Order Function",
    code: `const double = n => n*2;
const nums = [1,2,3,4];
console.log(nums.map(double));`,
  },
  {
    title: "🕹️ Class & Object",
    code: `class Player {
  constructor(name){ this.name = name; this.hp = 100; }
  attack(){ this.hp -= 10; console.log(\`\${this.name} attacks! HP:\${this.hp}\`); }
}
const p1 = new Player("🧑‍💻 JS Dev");
p1.attack(); p1.attack();`,
  },
  {
    title: "⛓️ Promise & Async",
    code: `const fetchData = () => new Promise(r => setTimeout(()=>r("✅ Data loaded!"), 500));
fetchData().then(console.log);`,
  },
  {
    title: "🎯 Array.filter()",
    code: `const scores = [89, 42, 77, 100, 61];
const passed = scores.filter(s => s >= 60);
console.log("Passed:", passed);`,
  },
  {
    title: "🪄 Closure Magic",
    code: `function counter(){
  let count = 0;
  return () => console.log(++count);
}
const c = counter();
c(); c(); c();`,
  },
  {
    title: "🏠 Home Sweet Home",
    code: `for (let i = 0; i < 10; i++) {
  console.log("I want to go home");
}`,
  },
];

export default function HomePage() {
  const [example, setExample] = useState(
    () => examples[Math.floor(Math.random() * examples.length)]
  );
  const [code, setCode] = useState(example.code);
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput(executeJS(example.code));
  }, [example]);

  const runCode = () => setOutput(executeJS(code));
  const shuffleExample = () => {
    const newExample = examples[Math.floor(Math.random() * examples.length)];
    setExample(newExample);
    setCode(newExample.code);
    setOutput(executeJS(newExample.code));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 상단 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{example.title}</h1>
        <button
          onClick={shuffleExample}
          className="text-sm bg-gray-700 text-gray-200 px-3 py-1.5 rounded hover:bg-gray-600 transition"
        >
          🔁 Try Another Example
        </button>
      </div>

      {/* 코드 에디터 */}
      <MonacoEditor
        height="280px"
        defaultLanguage="javascript"
        value={code}
        onChange={(v) => setCode(v || "")}
        theme="vs-dark"
      />

      {/* 실행 버튼 */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition self-start"
        onClick={runCode}
      >
        ▶ Run Code
      </button>

      {/* 출력 결과 */}
      <pre className="bg-black text-green-300 p-3 rounded min-h-[120px] overflow-auto">
        {output}
      </pre>
    </div>
  );
}
