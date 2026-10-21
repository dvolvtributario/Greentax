import estilos from "./MapaGoogle.module.css";

const SRC_MAPA =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14876.251458915158!2d-50.4395662!3d-21.229355599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x23b059ace7caae65%3A0x6de311f37a8a17e8!2sGreentax%20Contabilidade%20e%20Assessoria%20Empresarial!5e0!3m2!1spt-BR!2sbr!4v1792606258335!5m2!1spt-BR!2sbr";



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
