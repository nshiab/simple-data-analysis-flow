/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "docs",
  transpilePackages: ["shiki"],
}

export default nextConfig
