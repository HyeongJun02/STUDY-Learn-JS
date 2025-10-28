import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ❗️TypeScript 빌드 중 타입 에러가 있어도 빌드 계속 진행
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

export default nextConfig;
