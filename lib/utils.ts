type ClassValue = string | false | null | undefined;

/** Junta classes condicionais. Mantido simples de propósito — sem dependências. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
