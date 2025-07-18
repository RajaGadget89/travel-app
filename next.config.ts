import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // เพิ่มบรรทัดนี้เข้ามา
  reactStrictMode: true, // บรรทัดนี้อาจมีอยู่แล้วหรือไม่ก็ได้ ขึ้นอยู่กับตอนสร้างโปรเจกต์
};

export default nextConfig;
