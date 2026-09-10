import fs from "fs";
import path from "path";

const DIRETORIO = path.join(process.cwd(), "public", "clientes");

export type LogoCliente = {
  src: string;
  alt: string;
};

function altDeArquivo(arquivo: string): string {
  const nome = arquivo.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  if (!nome) return "Logo de cliente";
  return `Logo da ${nome}`;
}

export function listarLogosClientes(): LogoCliente[] {
  if (!fs.existsSync(DIRETORIO)) return [];
  return fs
    .readdirSync(DIRETORIO)
    .filter((arquivo) => /\.(jpe?g|png|webp|gif|svg)$/i.test(arquivo))
    .sort((a, b) => a.localeCompare(b))
    .map((arquivo) => ({
      src: `/clientes/${arquivo}`,
      alt: altDeArquivo(arquivo),
    }));
}