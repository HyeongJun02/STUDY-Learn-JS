/**
 * 안전한 JavaScript 실행 함수
 * - 무한 루프 방지 (타임아웃)
 * - console.log 가로채기 (객체 JSON pretty print)
 * - 전역 오염 방지 (Function sandbox)
 * - 오류 표시
 */
export default async function executeJS(code: string): Promise<string> {
  let output = "";
  const originalLog = console.log;

  // ✅ console.log 오버라이드
  console.log = (...args) => {
    const formatted = args
      .map((a) => {
        if (typeof a === "object") {
          try {
            return JSON.stringify(a, null, 2);
          } catch {
            return "[Circular Object]";
          }
        }
        return String(a);
      })
      .join(" ");
    output += formatted + "\n";
  };

  // ✅ 타임아웃 실행 래퍼 (무한 루프 방지)
  const runWithTimeout = (code: string, timeout = 1500) => {
    return new Promise<string>((resolve) => {
      const workerCode = `
        self.onmessage = e => {
          try {
            const result = (function() {
              "use strict";
              ${code}
            })();
            self.postMessage({ type: "done", result });
          } catch (err) {
            self.postMessage({ type: "error", error: err.message });
          }
        };
      `;

      const blob = new Blob([workerCode], { type: "application/javascript" });
      const worker = new Worker(URL.createObjectURL(blob));

      const timer = setTimeout(() => {
        worker.terminate();
        resolve("⚠️ Execution timed out (possible infinite loop)\n");
      }, timeout);

      worker.onmessage = (e) => {
        clearTimeout(timer);
        if (e.data.type === "error")
          resolve("❌ Error: " + e.data.error + "\n");
        else resolve("");
        worker.terminate();
      };

      worker.postMessage("");
    });
  };

  try {
    // ✅ Web Worker 기반 실행 (비동기)
    const timeoutMsg = await runWithTimeout(code);
    if (timeoutMsg) output += timeoutMsg;
  } catch (e: any) {
    output += "❌ Error: " + e.message + "\n";
  } finally {
    console.log = originalLog; // 원상복구
  }

  return output.trimEnd();
}
