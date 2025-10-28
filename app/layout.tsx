// src/app/layout.tsx
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen bg-[#0e1117] text-gray-200">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto bg-[#0e1117]">
          {children}
        </main>
      </body>
    </html>
  );
}
