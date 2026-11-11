import createMDX from "@next/mdx";
import type { NextConfig } from "next";


const estatico = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  ...(estatico
    ? {
        output: "export" as const,
        trailingSlash: true,
      }
    : {}),
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 86400,
    ...(estatico ? { unoptimized: true } : {}),
  },
  ...(!estatico
    ? {
        async headers() {
          const scriptSrc =
            process.env.NODE_ENV === "development"
              ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com"
              : "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com";
          const csp = [
            "default-src 'self'",
            "base-uri 'self'",
            "object-src 'none'",
            scriptSrc,
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: https://www.google.com https://www.google.com.br https://www.gstatic.com https://*.googletagmanager.com https://*.google-analytics.com https://*.g.doubleclick.net",
            "font-src 'self' data: https://fonts.gstatic.com",
            "connect-src 'self' https://hook.us2.make.com https://www.google.com https://www.gstatic.com https://*.googletagmanager.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.g.doubleclick.net",
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
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
