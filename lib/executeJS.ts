export default function executeJS(code: string) {
  let output = "";
  const originalLog = console.log;

  console.log = (...args) => {
    const formatted = args
      .map((a) => {
        if (typeof a === "object") {
          try {
            return JSON.stringify(a, null, 2); // pretty-print
          } catch {
            return "[Circular Object]";
          }
        }
        return String(a);
      })
      .join(" ");
    output += formatted + "\n";
  };

  try {
    eval(code);
  } catch (e: any) {
    output += "❌ Error: " + e.message + "\n";
  }

  console.log = originalLog;
  return output;
}
