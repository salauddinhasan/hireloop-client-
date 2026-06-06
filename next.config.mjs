/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  experimental: {
    serverComponentsExternalPackages: ["@better-auth/kysely-adapter", "kysely"],
  },
};

export default nextConfig;
