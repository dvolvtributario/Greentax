import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite que arquivos .mdx sejam tratados como páginas/conteúdo.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  // Plugins remark/rehype, quando necessários, devem ser passados como strings
  // (exigência do Turbopack, que é o bundler padrão no Next 16).
  options: {},
});

export default withMDX(nextConfig);
