import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite que arquivos .mdx sejam tratados como páginas/conteúdo.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  // Plugins remark/rehype, quando necessários, devem ser passados como strings
  // (exigência do Turbopack, que é o bundler padrão no Next 16).
  options: {},
});

export default withMDX(nextConfig);
