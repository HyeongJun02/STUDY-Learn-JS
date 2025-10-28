"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VisualizerProps {
  logs: string;
}

export default function Visualizer({ logs }: VisualizerProps) {
  const [values, setValues] = useState<{ name: string; value: string }[]>([]);

  useEffect(() => {
    // console.log 결과를 기반으로 변수 값 파싱 (단순한 형태)
    const lines = logs.split("\n").filter(Boolean);
    const parsed = lines.map((line, i) => ({
      name: "x", // 일단 let x 예시 전용
      value: line.trim(),
    }));
    setValues(parsed);
  }, [logs]);

  return (
    <div className="border-t mt-6 pt-4">
      <h2 className="text-xl font-semibold mb-3">🎬 변수 시각화</h2>

      <div className="flex gap-4 items-center">
        {values.length === 0 && (
          <p className="text-gray-500">코드를 실행하면 시각화됩니다.</p>
        )}

        <AnimatePresence mode="wait">
          {values.map((v, i) => (
            <motion.div
              key={`${v.value}-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-yellow-100 border border-yellow-400 rounded-lg px-6 py-3 text-lg font-mono shadow-md"
            >
              {v.name} ={" "}
              <span className="font-bold text-yellow-700">{v.value}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
