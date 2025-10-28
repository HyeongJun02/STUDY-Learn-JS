// src/app/page.tsx
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import executeJS from "@/lib/executeJS";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function HomePage() {
  const [code, setCode] = useState(`console.log("Hello, LearnJS!")`);
  const [output, setOutput] = useState<string>("");

  const runCode = () => {
    const result = executeJS(code);
    setOutput(result);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">LearnJS Playground</h1>
      <MonacoEditor
        height="300px"
        defaultLanguage="javascript"
        value={code}
        onChange={(v) => setCode(v || "")}
        theme="vs-dark"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={runCode}
      >
        Run ▶
      </button>
      <pre className="bg-black text-green-300 p-3 rounded min-h-[100px] overflow-auto">
        {output}
      </pre>
    </div>
  );
}
