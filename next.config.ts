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
          // Mantido em sincronia com a meta tag em app/layout.tsx (que cobre o
          // export estático do GitHub Pages); aqui é possível incluir também
          // frame-ancestors, que o spec de meta http-equiv ignora.
          const csp = [
            "default-src 'self'",
            "base-uri 'self'",
            "object-src 'none'",
            "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: https://www.google.com https://www.gstatic.com",
            "font-src 'self' data: https://fonts.gstatic.com",
            "connect-src 'self' https://hook.us2.make.com https://www.google.com https://www.gstatic.com",
            "frame-src https://www.google.com https://www.gstatic.com https://maps.google.com",
            "worker-src 'self' blob:",
            "form-action 'self'",
            "frame-ancestors 'none'",
          ].join("; ");
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "DENY" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "Content-Security-Policy", value: csp },
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
