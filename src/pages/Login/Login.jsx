import React, { useState } from "react";
import { ArrowRight, LockKeyhole, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Aluno");

  function handleSubmit(e) {
    e.preventDefault();
    logIn(role);
    navigate("/");
  }

  return (
    <div className="login-page">
      <div className="login-brand"><div className="brand-mark">N</div><strong>NSA 2.0</strong></div>
      <div className="login-card">
        <div className="login-icon"><GraduationCap size={27}/></div>
        <span className="eyebrow">PORTAL ACADÊMICO</span>
        <h1>Bem-vindo de volta</h1>
        <p>Entre para acessar o portal acadêmico.</p>
        <form onSubmit={handleSubmit}>
          <label>Tipo de acesso
          <select className="login-role-select" value={role} onChange={e => setRole(e.target.value)}>
              <option value="Aluno">Aluno</option>
            <option value="Professor">Professor</option>
              <option value="Escola" disabled>Escola — em construção</option>
            </select>
          </label>
          <label>RM, CPF ou e-mail<input value={login} onChange={e => setLogin(e.target.value)} placeholder="Digite seu acesso"/></label>
          <label>Senha<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha"/></label>
          <button className="primary-button" type="submit">Entrar <ArrowRight size={17}/></button>
        </form>
        <a className="forgot" href="#recuperar">Esqueci minha senha</a>
        <div className="login-note"><LockKeyhole size={16}/> Acesso demonstrativo: usuário e senha ainda não são validados. O portal da Escola continua em construção.</div>
      </div>
    </div>
  );
}