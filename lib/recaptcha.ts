export const ACAO_RECAPTCHA = "envio_contato";

// O endpoint "recaptcha/enterprise/siteverify" não existe (retorna 404);
// a Google valida chaves Enterprise pelo endpoint clássico, que devolve
// success/score/action para a mesma secret.
export const URL_RECAPTCHA_SITEVERIFY =
  "https://www.google.com/recaptcha/api/siteverify";

export const PONTUACAO_MINIMA_RECAPTCHA = 0.5;
