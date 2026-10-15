import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const profileFields = user.role === "Professor"
    ? [["Área de atuação", user.subject], ["Instituição", user.school]]
    : [["Curso", user.course], ["Módulo", user.module], ["Turma", user.className]];

  function handleLogout() {
    logOut();
    navigate("/login", { replace: true });
  }

  return <AppLayout title="Meu perfil">
    <section className="profile-header panel"><div className="large-avatar">{user.name.charAt(0)}</div><div><span className="eyebrow">{(user.role || "ALUNO").toUpperCase()}</span><h2>{user.name}</h2><p>{user.role === "Professor" ? user.subject : `${user.course} · ${user.module} · Turma ${user.className}`}</p></div></section>
    <div className="panel form-panel"><h3>Dados do perfil</h3><div className="form-grid"><label>Nome<input value={user.name} readOnly/></label>{profileFields.map(([label, value]) => <label key={label}>{label}<input value={value} readOnly/></label>)}</div></div>
    <section className="panel profile-logout">
      <div>
        <h3>Sair da conta</h3>
        <p>Encerre sua sessão neste dispositivo.</p>
      </div>
      <button className="logout-button" type="button" onClick={handleLogout}>
        <LogOut size={17} />
        Deslogar da conta
      </button>
    </section>
  </AppLayout>;
}