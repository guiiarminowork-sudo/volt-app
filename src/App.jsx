import { useState } from "react";

const YELLOW = "#F5C518";
const BG = "#0A0A0A";
const SURFACE = "#141414";
const SURFACE2 = "#1C1C1C";
const BORDER = "#2A2A2A";
const TEXT = "#F0F0F0";
const MUTED = "#666";
const GREEN = "#22C55E";
const RED = "#EF4444";
const ORANGE = "#F97316";

const styles = {
  phone: {
    width: 390,
    height: 844,
    background: BG,
    borderRadius: 44,
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 0 0 10px #111, 0 0 0 12px #222, 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(245,197,24,0.08)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'DM Sans', sans-serif",
  },
  statusBar: {
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
    flexShrink: 0,
  },
  statusTime: { fontSize: 15, fontWeight: 700, color: TEXT, letterSpacing: "-0.3px" },
  statusIcons: { display: "flex", gap: 6, alignItems: "center" },
  screen: { flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" },
  scrollArea: { flex: 1, overflowY: "auto", scrollbarWidth: "none" },
  bottomNav: {
    height: 80,
    background: SURFACE,
    borderTop: `1px solid ${BORDER}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 16,
    flexShrink: 0,
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    cursor: "pointer",
    flex: 1,
  },
  navLabel: { fontSize: 10, fontWeight: 600, letterSpacing: "0.3px" },
  fab: {
    position: "absolute",
    bottom: 96,
    right: 20,
    width: 56,
    height: 56,
    background: YELLOW,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: `0 8px 24px rgba(245,197,24,0.4)`,
    zIndex: 10,
  },
};

// ICONS
const Icon = ({ name, size = 20, color = MUTED }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M3 12L12 3l9 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    clients: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.87" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
    services: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    finance: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
    more: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1.5" fill={color}/><circle cx="12" cy="12" r="1.5" fill={color}/><circle cx="12" cy="19" r="1.5" fill={color}/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><line x1="12" y1="5" x2="12" y2="19" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    whatsapp: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L0 24l6.335-1.524A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.502-5.193-1.38l-.371-.222-3.863.93.976-3.77-.243-.386A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    doc: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    map: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2"/></svg>,
    bolt: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><line x1="18" y1="20" x2="18" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><polyline points="9 18 15 12 9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    camera: <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" stroke={color} strokeWidth="2"/></svg>,
  };
  return icons[name] || null;
};

// STATUS BADGE
const Badge = ({ status }) => {
  const map = {
    pendente: { bg: "rgba(249,115,22,0.15)", color: ORANGE, label: "Pendente" },
    aprovado: { bg: "rgba(34,197,94,0.15)", color: GREEN, label: "Aprovado" },
    concluido: { bg: "rgba(34,197,94,0.15)", color: GREEN, label: "Concluído" },
    andamento: { bg: "rgba(245,197,24,0.15)", color: YELLOW, label: "Em andamento" },
    atrasado: { bg: "rgba(239,68,68,0.15)", color: RED, label: "Atrasado" },
    recusado: { bg: "rgba(239,68,68,0.15)", color: RED, label: "Recusado" },
  };
  const s = map[status] || map.pendente;
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: 10, fontWeight: 700, padding: "3px 8px",
      borderRadius: 6, letterSpacing: "0.4px", textTransform: "uppercase"
    }}>{s.label}</span>
  );
};

// AVATAR
const Avatar = ({ name, size = 38, color = YELLOW }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.35,
      background: `${color}22`, border: `1.5px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 800, color, flexShrink: 0,
      letterSpacing: "-0.5px"
    }}>{initials}</div>
  );
};

// ── SCREENS ──

function DashboardScreen() {
  return (
    <div style={{ padding: "0 0 16px" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, color: MUTED, fontWeight: 500, marginBottom: 2 }}>Bom dia,</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: TEXT, letterSpacing: "-0.8px", lineHeight: 1 }}>João ⚡</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: SURFACE2, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="bell" size={18} color={MUTED} />
            </div>
            <div style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, background: YELLOW, borderRadius: "50%", border: `2px solid ${BG}` }} />
          </div>
          <Avatar name="João Silva" size={38} />
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { label: "Serviços hoje", value: "3", sub: "Próx: 09:00", accent: YELLOW },
          { label: "A receber", value: "R$1.840", sub: "4 pendentes", accent: GREEN },
          { label: "Orçamentos", value: "7", sub: "3 sem resposta", accent: ORANGE },
          { label: "Concluídos", value: "12", sub: "este mês", accent: "#60A5FA" },
        ].map((c, i) => (
          <div key={i} style={{
            background: SURFACE, border: `1px solid ${BORDER}`,
            borderRadius: 16, padding: "16px 14px",
            position: "relative", overflow: "hidden", cursor: "pointer",
          }}>
            <div style={{ position: "absolute", top: -12, right: -12, width: 50, height: 50, borderRadius: "50%", background: `${c.accent}10` }} />
            <div style={{ fontSize: 11, color: MUTED, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{c.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: c.accent, letterSpacing: "-1px", lineHeight: 1 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Next Services */}
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: TEXT, letterSpacing: "-0.4px" }}>Próximos serviços</div>
          <div style={{ fontSize: 12, color: YELLOW, fontWeight: 700, cursor: "pointer" }}>Ver todos</div>
        </div>
        {[
          { name: "Carlos Mendes", time: "09:00", addr: "Rua das Flores, 142", status: "andamento", color: "#60A5FA" },
          { name: "Ana Oliveira", time: "13:30", addr: "Av. Paulista, 890", status: "pendente", color: YELLOW },
          { name: "Roberto Lima", time: "16:00", addr: "Rua Augusta, 55", status: "pendente", color: GREEN },
        ].map((s, i) => (
          <div key={i} style={{
            background: SURFACE, border: `1px solid ${BORDER}`,
            borderRadius: 14, padding: "14px", marginBottom: 10,
            display: "flex", gap: 12, alignItems: "center", cursor: "pointer",
          }}>
            <Avatar name={s.name} size={40} color={s.color} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 3 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: MUTED, display: "flex", gap: 8 }}>
                <span>⏰ {s.time}</span>
                <span>📍 {s.addr}</span>
              </div>
            </div>
            <Badge status={s.status} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: TEXT, letterSpacing: "-0.4px", marginBottom: 14 }}>Ações rápidas</div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { icon: "doc", label: "Orçamento", color: YELLOW },
            { icon: "clients", label: "Cliente", color: "#60A5FA" },
            { icon: "services", label: "Serviço", color: GREEN },
            { icon: "whatsapp", label: "WhatsApp", color: "#25D366" },
          ].map((a, i) => (
            <div key={i} style={{
              flex: 1, background: SURFACE, border: `1px solid ${BORDER}`,
              borderRadius: 14, padding: "12px 6px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer",
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={a.icon} size={18} color={a.color} />
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textAlign: "center" }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClientsScreen() {
  const clients = [
    { name: "Carlos Mendes", phone: "(11) 98765-4321", lastService: "Troca disjuntor", status: "ativo", color: "#60A5FA" },
    { name: "Ana Oliveira", phone: "(11) 97654-3210", lastService: "Instalação tomadas", status: "ativo", color: YELLOW },
    { name: "Roberto Lima", phone: "(11) 96543-2109", lastService: "Passagem de fios", status: "novo", color: GREEN },
    { name: "Fernanda Costa", phone: "(11) 95432-1098", lastService: "Quadro elétrico", status: "ativo", color: ORANGE },
    { name: "Marcos Pereira", phone: "(11) 94321-0987", lastService: "Iluminação LED", status: "inativo", color: MUTED },
  ];

  return (
    <div style={{ padding: "0 0 16px" }}>
      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: TEXT, letterSpacing: "-0.8px", marginBottom: 16 }}>Clientes</div>
        <div style={{
          background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12,
          display: "flex", alignItems: "center", padding: "0 14px", gap: 10
        }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <input placeholder="Buscar cliente…" style={{
            background: "transparent", border: "none", outline: "none",
            color: TEXT, fontSize: 14, padding: "12px 0", flex: 1,
            fontFamily: "'DM Sans', sans-serif",
          }} />
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        {clients.map((c, i) => (
          <div key={i} style={{
            background: SURFACE, border: `1px solid ${BORDER}`,
            borderRadius: 14, padding: "14px", marginBottom: 10,
            display: "flex", gap: 12, alignItems: "center", cursor: "pointer",
          }}>
            <Avatar name={c.name} size={44} color={c.color} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 3 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: MUTED, marginBottom: 4 }}>{c.phone}</div>
              <div style={{ fontSize: 11, color: MUTED }}>Último: {c.lastService}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
              <Icon name="arrow" size={16} color={BORDER} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuotesScreen() {
  const quotes = [
    { client: "Carlos Mendes", desc: "Troca de disjuntor + 4 tomadas", value: "R$ 480,00", date: "20/05", status: "pendente" },
    { client: "Ana Oliveira", desc: "Instalação de 6 pontos de luz", value: "R$ 760,00", date: "19/05", status: "aprovado" },
    { client: "Roberto Lima", desc: "Passagem de fios sala/quarto", value: "R$ 320,00", date: "17/05", status: "concluido" },
    { client: "Fernanda Costa", desc: "Troca quadro elétrico completo", value: "R$ 1.200,00", date: "15/05", status: "recusado" },
    { client: "Marcos Pereira", desc: "Instalação LED externo", value: "R$ 280,00", date: "12/05", status: "aprovado" },
  ];

  return (
    <div style={{ padding: "0 0 16px" }}>
      <div style={{ padding: "16px 20px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: TEXT, letterSpacing: "-0.8px" }}>Orçamentos</div>
        <div style={{
          background: YELLOW, borderRadius: 10, padding: "8px 14px",
          fontSize: 12, fontWeight: 800, color: "#000", cursor: "pointer", letterSpacing: "-0.2px"
        }}>+ Novo</div>
      </div>

      {/* Filters */}
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
        {["Todos", "Pendente", "Aprovado", "Concluído"].map((f, i) => (
          <div key={f} style={{
            background: i === 0 ? YELLOW : SURFACE, border: `1px solid ${i === 0 ? YELLOW : BORDER}`,
            borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700,
            color: i === 0 ? "#000" : MUTED, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0
          }}>{f}</div>
        ))}
      </div>

      <div style={{ padding: "0 20px" }}>
        {quotes.map((q, i) => (
          <div key={i} style={{
            background: SURFACE, border: `1px solid ${BORDER}`,
            borderRadius: 14, padding: "16px", marginBottom: 10, cursor: "pointer",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{q.client}</div>
              <Badge status={q.status} />
            </div>
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 12, lineHeight: 1.5 }}>{q.desc}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: YELLOW, letterSpacing: "-0.5px" }}>{q.value}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 32, height: 32, background: `#25D36620`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Icon name="whatsapp" size={16} color="#25D366" />
                </div>
                <div style={{ width: 32, height: 32, background: `${YELLOW}20`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Icon name="doc" size={16} color={YELLOW} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceScreen() {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai"];
  const values = [3200, 4100, 3800, 5200, 4600];
  const maxVal = Math.max(...values);

  return (
    <div style={{ padding: "0 0 16px" }}>
      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: TEXT, letterSpacing: "-0.8px", marginBottom: 16 }}>Financeiro</div>

        {/* Summary Card */}
        <div style={{
          background: `linear-gradient(135deg, ${YELLOW}15 0%, ${YELLOW}05 100%)`,
          border: `1px solid ${YELLOW}30`, borderRadius: 20, padding: 20, marginBottom: 16
        }}>
          <div style={{ fontSize: 12, color: MUTED, fontWeight: 600, marginBottom: 6 }}>FATURAMENTO DO MÊS</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: YELLOW, letterSpacing: "-1.5px", marginBottom: 4 }}>R$ 4.600</div>
          <div style={{ fontSize: 12, color: GREEN, fontWeight: 700 }}>↑ 11% vs abril</div>
        </div>

        {/* 3 mini cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[
            { label: "Recebido", value: "R$3.200", color: GREEN },
            { label: "Pendente", value: "R$1.400", color: ORANGE },
            { label: "Atrasado", value: "R$240", color: RED },
          ].map((c, i) => (
            <div key={i} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "12px 10px" }}>
              <div style={{ fontSize: 9, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: c.color, letterSpacing: "-0.5px" }}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 16, letterSpacing: "-0.3px" }}>Faturamento mensal</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
            {values.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: "100%", height: (v / maxVal) * 68,
                  background: i === 4 ? YELLOW : `${YELLOW}30`,
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.5s",
                }} />
                <div style={{ fontSize: 10, color: MUTED, fontWeight: 600 }}>{months[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div style={{ fontSize: 15, fontWeight: 800, color: TEXT, letterSpacing: "-0.4px", marginBottom: 12 }}>Últimas transações</div>
        {[
          { name: "Carlos Mendes", date: "Hoje, 14:30", value: "+R$480", type: "pix", color: GREEN },
          { name: "Ana Oliveira", date: "Ontem, 10:00", value: "+R$760", type: "dinheiro", color: GREEN },
          { name: "Roberto Lima", date: "19/05", value: "R$320", type: "pendente", color: ORANGE },
        ].map((t, i) => (
          <div key={i} style={{
            background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12,
            padding: "12px 14px", marginBottom: 8,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <Avatar name={t.name} size={36} color={t.color} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>{t.name}</div>
              <div style={{ fontSize: 11, color: MUTED }}>{t.date} · {t.type}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: t.color }}>{t.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceDetailScreen() {
  const checks = [
    { label: "Desligar energia", done: true },
    { label: "Instalar disjuntor", done: true },
    { label: "Testar circuito", done: false },
    { label: "Finalizar e limpar", done: false },
  ];

  return (
    <div style={{ padding: "0 0 16px" }}>
      {/* Top */}
      <div style={{ background: SURFACE, padding: "16px 20px 20px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: YELLOW, fontWeight: 700, cursor: "pointer" }}>← Voltar</div>
          <Badge status="andamento" />
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: TEXT, letterSpacing: "-0.6px", marginBottom: 6 }}>Troca de disjuntor</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar name="Carlos Mendes" size={32} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>Carlos Mendes</div>
            <div style={{ fontSize: 11, color: MUTED }}>⏰ Hoje, 09:00 · 📍 Rua das Flores, 142</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 20px" }}>
        {/* Quick contact */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {[
            { icon: "whatsapp", label: "WhatsApp", color: "#25D366" },
            { icon: "phone", label: "Ligar", color: "#60A5FA" },
            { icon: "map", label: "Maps", color: ORANGE },
          ].map((b, i) => (
            <div key={i} style={{
              flex: 1, background: SURFACE, border: `1px solid ${BORDER}`,
              borderRadius: 12, padding: "10px 6px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer"
            }}>
              <Icon name={b.icon} size={20} color={b.color} />
              <div style={{ fontSize: 10, fontWeight: 700, color: MUTED }}>{b.label}</div>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: TEXT, marginBottom: 12, letterSpacing: "-0.3px" }}>Checklist</div>
          {checks.map((c, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "center",
              padding: "10px 0", borderBottom: i < checks.length - 1 ? `1px solid ${BORDER}` : "none"
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                background: c.done ? GREEN : "transparent",
                border: `2px solid ${c.done ? GREEN : BORDER}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0
              }}>
                {c.done && <Icon name="check" size={12} color="#fff" />}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.done ? MUTED : TEXT, textDecoration: c.done ? "line-through" : "none" }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Materials */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: TEXT, marginBottom: 12, letterSpacing: "-0.3px" }}>Materiais usados</div>
          {[
            { item: "Disjuntor 20A", qty: 1, value: "R$45" },
            { item: "Fio 2,5mm (metro)", qty: 3, value: "R$18" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i === 0 ? `1px solid ${BORDER}` : "none" }}>
              <div style={{ fontSize: 12, color: TEXT }}>{m.item}</div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ fontSize: 12, color: MUTED }}>×{m.qty}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: YELLOW }}>{m.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Photos */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: TEXT, marginBottom: 12, letterSpacing: "-0.3px" }}>Fotos</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Antes", "Durante", "Depois"].map((p, i) => (
              <div key={i} style={{
                flex: 1, height: 70, borderRadius: 10,
                background: `${YELLOW}08`, border: `1.5px dashed ${BORDER}`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer"
              }}>
                <Icon name="camera" size={16} color={MUTED} />
                <div style={{ fontSize: 9, color: MUTED, fontWeight: 700 }}>{p}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Finish button */}
        <div style={{
          background: YELLOW, borderRadius: 14, padding: "16px",
          textAlign: "center", cursor: "pointer",
          fontSize: 14, fontWeight: 800, color: "#000", letterSpacing: "-0.3px",
          boxShadow: `0 8px 24px ${YELLOW}40`
        }}>Finalizar serviço ⚡</div>
      </div>
    </div>
  );
}

// ── MAIN APP ──
export default function App() {
  const [screen, setScreen] = useState("home");
  const [showDetail, setShowDetail] = useState(false);

  const navItems = [
    { id: "home", icon: "home", label: "Início" },
    { id: "clients", icon: "clients", label: "Clientes" },
    { id: "services", icon: "services", label: "Serviços" },
    { id: "finance", icon: "finance", label: "Financeiro" },
    { id: "more", icon: "more", label: "Mais" },
  ];

  const renderScreen = () => {
    if (showDetail) return <ServiceDetailScreen />;
    switch (screen) {
      case "home": return <DashboardScreen />;
      case "clients": return <ClientsScreen />;
      case "services": return <QuotesScreen />;
      case "finance": return <FinanceScreen />;
      default: return <DashboardScreen />;
    }
  };

  const handleNav = (id) => {
    setShowDetail(false);
    setScreen(id);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{
        minHeight: "100vh",
        background: "#050505",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${YELLOW}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="bolt" size={22} color={YELLOW} />
            <div style={{ fontSize: 22, fontWeight: 900, color: TEXT, letterSpacing: "-1px" }}>VOLT</div>
            <div style={{ fontSize: 11, color: MUTED, fontWeight: 600, letterSpacing: "1px", marginLeft: 4, paddingTop: 2 }}>APP</div>
          </div>

          {/* Phone */}
          <div style={styles.phone}>
            {/* Status Bar */}
            <div style={styles.statusBar}>
              <span style={styles.statusTime}>9:41</span>
              <div style={styles.statusIcons}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <rect x="0" y="6" width="3" height="6" rx="1" fill={TEXT} />
                  <rect x="4" y="4" width="3" height="8" rx="1" fill={TEXT} />
                  <rect x="8" y="2" width="3" height="10" rx="1" fill={TEXT} />
                  <rect x="12" y="0" width="3" height="12" rx="1" fill={TEXT} />
                </svg>
                <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                  <path d="M7.5 2.5C9.7 2.5 11.6 3.5 13 5L14.5 3.4C12.7 1.6 10.2.5 7.5.5s-5.2 1.1-7 2.9L2 4.9C3.4 3.5 5.3 2.5 7.5 2.5z" fill={TEXT} />
                  <path d="M7.5 5.5c1.4 0 2.7.6 3.6 1.6L12.6 5.6C11.3 4.3 9.5 3.5 7.5 3.5S3.7 4.3 2.4 5.6l1.5 1.5C4.8 6.1 6.1 5.5 7.5 5.5z" fill={TEXT} />
                  <circle cx="7.5" cy="10" r="1.5" fill={TEXT} />
                </svg>
                <div style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>100%</div>
              </div>
            </div>

            {/* Screen content */}
            <div style={styles.screen}>
              <div style={styles.scrollArea}>
                {renderScreen()}
              </div>
            </div>

            {/* FAB */}
            {!showDetail && (
              <div style={styles.fab} onClick={() => setShowDetail(true)}>
                <Icon name="plus" size={22} />
              </div>
            )}

            {/* Bottom Nav */}
            <div style={styles.bottomNav}>
              {navItems.map(n => {
                const active = !showDetail && screen === n.id;
                return (
                  <div key={n.id} style={styles.navItem} onClick={() => handleNav(n.id)}>
                    <Icon name={n.icon} size={22} color={active ? YELLOW : MUTED} />
                    <span style={{ ...styles.navLabel, color: active ? YELLOW : MUTED }}>{n.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", maxWidth: 420 }}>
            {[
              { screen: "home", label: "Dashboard" },
              { screen: "clients", label: "Clientes" },
              { screen: "services", label: "Orçamentos" },
              { screen: "finance", label: "Financeiro" },
            ].map(s => (
              <div key={s.screen}
                onClick={() => handleNav(s.screen)}
                style={{
                  background: screen === s.screen && !showDetail ? `${YELLOW}20` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${screen === s.screen && !showDetail ? `${YELLOW}40` : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 20, padding: "6px 14px",
                  fontSize: 12, fontWeight: 700,
                  color: screen === s.screen && !showDetail ? YELLOW : MUTED,
                  cursor: "pointer",
                }}>{s.label}</div>
            ))}
            <div
              onClick={() => setShowDetail(true)}
              style={{
                background: showDetail ? `${YELLOW}20` : "rgba(255,255,255,0.04)",
                border: `1px solid ${showDetail ? `${YELLOW}40` : "rgba(255,255,255,0.08)"}`,
                borderRadius: 20, padding: "6px 14px",
                fontSize: 12, fontWeight: 700,
                color: showDetail ? YELLOW : MUTED, cursor: "pointer"
              }}>Detalhe serviço</div>
          </div>
        </div>
      </div>
    </>
  );
}
