/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  experimental: {
    serverComponentsExternalPackages: ["@better-auth/kysely-adapter", "kysely"],
  },

  // 🎯 ফিক্স: রাউট নাম company থেকে বদলে companies করা হলো
  async rewrites() {
    return [
      {
        source: "/api/companies/:path*",
        destination: "http://localhost:5000/api/companies/:path*",
      },
    ];
  },
};

export default nextConfig;
