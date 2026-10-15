import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { subjects, attendance } from "../../services/mock/mockData";

export default function Attendance() {
  return <AppLayout title="Frequência">
    <section className="page-intro"><span className="eyebrow">ACADÊMICO</span><h2>Controle de frequência</h2><p>Veja sua presença por disciplina e acompanhe possíveis alertas.</p></section>
    <div className="attendance-overview panel"><div className="attendance-ring"><strong>{attendance.percentage}%</strong><span>presença geral</span></div><div><h3>Sua frequência está saudável.</h3><p>Você possui {attendance.absences} faltas em {attendance.totalClasses} aulas registradas.</p><div className="alert-box success">✓ Nenhum alerta de frequência no momento.</div></div></div>
    <div className="cards-grid">{subjects.map(s => <div className="panel subject-card" key={s.name}><div><span className="muted">{s.teacher}</span><h3>{s.name}</h3></div><strong>{s.attendance}%</strong><div className="progress-track"><div className="progress-bar" style={{width:`${s.attendance}%`}}/></div></div>)}</div>
  </AppLayout>;
}