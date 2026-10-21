import estilos from "./MapaGoogle.module.css";

const SRC_MAPA =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.091425208732!2d-50.437224799999996!3d-21.228222899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9496435a5c7055b3%3A0xf0a7ee7a90e78908!2sDvolv%20Intelig%C3%AAncia%20tribut%C3%A1ria!5e0!3m2!1spt-BR!2sbr!4v1787861041430!5m2!1spt-BR!2sbr";

// Carrega sempre, sem depender do consentimento de cookies (decisão da
// Greentax). A política de privacidade (seção 7) descreve esse comportamento.
export function MapaGoogle() {
  return (
    <div className={estilos.mapa}>
      <iframe
        src={SRC_MAPA}
        className={estilos.frame}
        width="500"
        height="450"
        title="Mapa de localização da Greentax"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
