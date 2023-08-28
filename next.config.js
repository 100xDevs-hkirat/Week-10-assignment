/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    SECRET: 'secret',
    BASE_URL: "http://localhost:3000",
  }
}

module.exports = nextConfig
