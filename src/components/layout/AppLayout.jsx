import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  BookOpen, CalendarDays, ChevronLeft, FileText, Gauge,
  GraduationCap, LayoutDashboard, Menu, UserRound, ClipboardList, X
} from "lucide-react";

const links = [
  ["/", "Início", LayoutDashboard],
  ["/disciplinas", "Disciplinas", BookOpen],
  ["/notas", "Notas", GraduationCap],
  ["/frequencia", "Frequência", Gauge],
  ["/horario", "Horário", CalendarDays],
  ["/documentos", "Documentos", FileText],
  ["/solicitacoes", "Solicitações", ClipboardList],
];

const teacherLinks = [
  ["/", "Início", LayoutDashboard],
  ["/horario", "Agenda", CalendarDays],
];

export default function AppLayout({ children, title = "Início" }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const visibleLinks = user?.role === "Professor" ? teacherLinks : links;
  const portalLabel = user?.role === "Professor"
    ? "PORTAL DO PROFESSOR"
    : user?.role === "Escola"
      ? "PORTAL DA ESCOLA"
      : "PORTAL DO ALUNO";

  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">N</div>
          {!collapsed && <div><strong>NSA 2.0</strong><span>Portal acadêmico</span></div>}
          <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)}><X size={19}/></button>
        </div>

        <nav className="nav">
          <span className="nav-label">{!collapsed && "MENU"}</span>
          {visibleLinks.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === "/"} className="nav-link" onClick={() => setMobileOpen(false)}>
              <Icon size={19} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <NavLink to="/perfil" className="nav-link"><UserRound size={19}/>{!collapsed && <span>Meu perfil</span>}</NavLink>
          <button className="collapse-button" onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeft size={18} className={collapsed ? "rotate-180" : ""}/>
            {!collapsed && <span>Recolher menu</span>}
          </button>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <button className="mobile-menu icon-button" onClick={() => setMobileOpen(true)}><Menu size={22}/></button>
          <div>
            <span className="eyebrow">{portalLabel}</span>
            <h1>{title}</h1>
          </div>
          <div className="topbar-actions">
            <NavLink to="/perfil" className="avatar">{user?.name?.charAt(0) || "U"}</NavLink>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}