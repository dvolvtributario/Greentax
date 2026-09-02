"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, ArrowLeft, RotateCcw, Send, Minus } from "lucide-react";
import { whatsappLink } from "@/lib/site";

const FLOW = {
  start: {
    text: "Olá! Sou o assistente virtual da Greentax. Sobre o que você quer falar hoje?",
    options: [
      { label: "Abertura de empresa", next: "abertura" },
      { label: "Declaração de Imposto de Renda", next: "ir" },
      { label: "Prazos e obrigações do mês", next: "prazos" },
      { label: "Falar direto com um contador", next: "humano" },
    ],
  },

  abertura: {
    text: "Legal! Qual tipo de empresa você pretende abrir?",
    options: [
      { label: "MEI (Microempreendedor Individual)", next: "abertura_mei" },
      { label: "Empresa Ltda / Sociedade", next: "abertura_ltda" },
      { label: "Não sei qual se encaixa no meu caso", next: "abertura_duvida" },
    ],
  },
  abertura_mei: {
    text: "O MEI é indicado para faturamento anual de até R$ 81 mil, atividade autônoma e no máximo 1 funcionário. A abertura é feita gratuitamente pelo Portal do Empreendedor, mas recomendamos acompanhamento contábil para não perder prazos de pagamento do DAS e da declaração anual (DASN-SIMEI).",
    options: [],
  },
  abertura_ltda: {
    text: "Para Ltda o processo passa por: consulta de viabilidade do nome, contrato social registrado na Junta Comercial, CNPJ na Receita Federal, inscrições municipal/estadual (se aplicável) e definição do regime tributário (Simples, Lucro Presumido ou Real). É nessa etapa que o contador faz mais diferença, evitando escolher um regime que pesa mais imposto do que o necessário.",
    options: [],
  },
  abertura_duvida: {
    text: "Sem problema, isso depende do seu faturamento esperado, se você vai ter sócios e se vai contratar funcionários. Esse tipo de decisão é melhor conversar diretamente com um contador para não errar na escolha do regime.",
    options: [],
  },

  ir: {
    text: "Entendido. Você está declarando como pessoa física ou é sobre a empresa (pessoa jurídica)?",
    options: [
      { label: "Pessoa física (IRPF)", next: "ir_pf" },
      { label: "Pessoa jurídica (empresa)", next: "ir_pj" },
    ],
  },
  ir_pf: {
    text: "A declaração de IRPF costuma abrir em março e o prazo final é o último dia útil de maio. Você precisa declarar se teve rendimentos tributáveis acima do limite anual, movimentações relevantes em bolsa, ou bens acima de R$ 300 mil, entre outras regras. Reunir informes de rendimento e comprovantes com antecedência evita correr contra o prazo.",
    options: [],
  },
  ir_pj: {
    text: "Para empresas, o que se aplica depende do regime tributário: Simples Nacional tem a declaração anual (DEFIS), enquanto Lucro Presumido e Lucro Real têm apurações trimestrais ou mensais de IRPJ e CSLL. Vale revisar com o contador qual obrigação está no seu calendário este mês.",
    options: [],
  },

  prazos: {
    text: "Alguns prazos que costumam gerar dúvida:",
    options: [
      { label: "DAS (Simples Nacional / MEI)", next: "prazo_das" },
      { label: "Obrigações trabalhistas (folha/eSocial)", next: "prazo_trabalhista" },
      { label: "Ver todos os prazos deste mês", next: "humano" },
    ],
  },
  prazo_das: {
    text: "O DAS vence todo dia 20 de cada mês (ou próximo dia útil, se cair em fim de semana ou feriado). Atraso gera multa e juros e pode comprometer a regularidade da empresa.",
    options: [],
  },
  prazo_trabalhista: {
    text: "Empresas com funcionários têm obrigações como envio de eventos ao eSocial, pagamento do FGTS até o dia 20 e da folha conforme o que estiver definido em convenção coletiva. Os prazos exatos variam conforme a categoria, então o ideal é confirmar com o contador responsável pela sua folha.",
    options: [],
  },

  humano: {
    text: "Sem problema! Vou te direcionar para conversar direto com um contador no WhatsApp, é mais rápido para casos específicos.",
    options: [],
  },
};

function isLeaf(nodeKey) {
  const node = FLOW[nodeKey];
  return !node.options || node.options.length === 0;
}

export default function ChatbotContabilidade() {
  const [path, setPath] = useState(["start"]);
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowNotification(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showNotification && isOpen) {
      setShowNotification(false);
    }
  }, [isOpen, showNotification]);

  const currentKey = path[path.length - 1];
  const currentNode = FLOW[currentKey];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [path, isOpen]);

  function handleSelect(nextKey) {
    setPath((p) => [...p, nextKey]);
    setShowNotification(true);
  }

  function handleBack() {
    if (path.length > 1) {
      setPath((p) => p.slice(0, -1));
    }
  }

  function handleRestart() {
    setPath(["start"]);
  }

  const whatsappHref = whatsappLink(
    "Olá! Estava conversando com o assistente do site e gostaria de falar com um contador."
  );

  if (!isOpen) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          title="Abrir assistente contábil"
          className="chatbotBotaoEntrada"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: "#0F2B1D",
            border: "none",
            boxShadow: "0 8px 24px rgba(15,43,29,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          <MessageCircle size={24} color="#F7F5F0" />
        </button>

        {showNotification && (
          <div
            className="chatbotNotificacao"
            style={{
              position: "fixed",
              bottom: 100,
              right: 24,
              background: "#0F2B1D",
              color: "#F7F5F0",
              padding: "12px 16px",
              borderRadius: 8,
              fontSize: 14,
              boxShadow: "0 8px 24px rgba(15,43,29,0.35)",
              zIndex: 9998,
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <MessageCircle size={18} />
              <span>Nova mensagem do assistente</span>
            </div>
          </div>
        )}

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <div
      className="chatbotPainelEntrada"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        fontFamily: "'Inter', system-ui, sans-serif",
        width: 380,
        maxWidth: "calc(100vw - 32px)",
        background: "#F7F5F0",
        border: "1px solid #D8D2C4",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 8px 30px rgba(15,43,29,0.25)",
        display: "flex",
        flexDirection: "column",
        height: 560,
        maxHeight: "calc(100vh - 48px)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#0F2B1D",
          color: "#F7F5F0",
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#4A7856",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MessageCircle size={18} color="#F7F5F0" />
          </div>
          <div
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 16,
              lineHeight: 1.1,
            }}
          >
            Assistente Contábil
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            onClick={() => setIsOpen(false)}
            title="Minimizar"
            style={{
              background: "transparent",
              border: "none",
              color: "#F7F5F0",
              opacity: 0.75,
              cursor: "pointer",
              padding: 6,
            }}
          >
            <Minus size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {path.map((key, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {i > 0 && (
              <div style={{ alignSelf: "flex-end" }}>
                <UserBubble text={FLOW[path[i - 1]].options.find((o) => o.next === key)?.label} />
              </div>
            )}
            <BotBubble text={FLOW[key].text} />
          </div>
        ))}

        {!isLeaf(currentKey) ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {currentNode.options.map((opt) => (
              <button
                key={opt.next}
                onClick={() => handleSelect(opt.next)}
                style={optionButtonStyle}
              >
                {opt.label}
                <Send size={13} style={{ opacity: 0.5, flexShrink: 0 }} />
              </button>
            ))}
          </div>
        ) : (
          <div
            style={{
              marginTop: 6,
              paddingTop: 14,
              borderTop: "1px dashed #D8D2C4",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 12.5, color: "#6B6558" }}>
              Quer entrar em mais detalhes sobre o seu caso?
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "#25D366",
                color: "#0F2B1D",
                fontWeight: 600,
                fontSize: 14,
                padding: "12px 16px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              <MessageCircle size={17} />
              Falar com um contador no WhatsApp
            </a>
          </div>
        )}
      </div>

      <div
        style={{
          borderTop: "1px solid #D8D2C4",
          padding: "10px 16px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleBack}
          disabled={path.length === 1}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "none",
            color: path.length === 1 ? "#C9C4B4" : "#0F2B1D",
            fontSize: 12.5,
            cursor: path.length === 1 ? "default" : "pointer",
          }}
        >
          <ArrowLeft size={14} /> Voltar
        </button>
      </div>
    </div>
  );
}

function BotBubble({ text }) {
  return (
    <div
      style={{
        alignSelf: "flex-start",
        background: "#FFFFFF",
        border: "1px solid #D8D2C4",
        color: "#0F2B1D",
        borderRadius: "4px 14px 14px 14px",
        padding: "10px 13px",
        fontSize: 13.5,
        lineHeight: 1.5,
        maxWidth: "88%",
      }}
    >
      {text}
    </div>
  );
}

function UserBubble({ text }) {
  if (!text) return null;
  return (
    <div
      style={{
        background: "#4A7856",
        color: "#F7F5F0",
        borderRadius: "14px 4px 14px 14px",
        padding: "9px 13px",
        fontSize: 13.5,
        lineHeight: 1.9,
        maxWidth: "80%",
      }}
    >
      {text}
    </div>
  );
}

const optionButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  textAlign: "left",
  background: "#FFFFFF",
  border: "1px solid #D8D2C4",
  color: "#0F2B1D",
  borderRadius: 10,
  padding: "11px 13px",
  fontSize: 13.5,
  cursor: "pointer",
};