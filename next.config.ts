import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// O deploy no GitHub Pages roda `next build` com NEXT_OUTPUT=export (site
// estático, sem servidor). Dev local e builds com servidor ficam iguais —
// admin, proxy e server features continuam funcionando fora do CI.
const estatico = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  ...(estatico
    ? {
        output: "export" as const,
        // GitHub Pages serve diretórios: /blog vira /blog/index.html.
        trailingSlash: true,
      }
    : {}),
  // Permite que arquivos .mdx sejam tratados como páginas/conteúdo.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 86400,
    // O loader padrão de imagens exige servidor de otimização — não existe
    // no export estático.
    ...(estatico ? { unoptimized: true } : {}),
  },
  // Headers de resposta exigem servidor; não há como defini-los no GitHub
  // Pages (só arquivos estáticos).
  ...(!estatico
    ? {
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
      }
    : {}),
};

const withMDX = createMDX({
  // Plugins remark/rehype, quando necessários, devem ser passados como strings
  // (exigência do Turbopack, que é o bundler padrão no Next 16).
  options: {},
});

export default withMDX(nextConfig);
