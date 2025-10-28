// src/lib/executeJS.ts
export default function executeJS(code: string) {
  try {
    const consoleLogs: string[] = [];
    const originalLog = console.log;
    console.log = (...args) => consoleLogs.push(args.join(" "));
    new Function(code)();
    console.log = originalLog;
    return consoleLogs.join("\n") || "(no output)";
  } catch (err: any) {
    return `Error: ${err.message}`;
  }
}
