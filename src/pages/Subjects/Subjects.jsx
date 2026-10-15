import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { subjects } from "../../services/mock/mockData";

export default function Subjects() {
  return <AppLayout title="Disciplinas">
    <section className="page-intro"><span className="eyebrow">CURSO</span><h2>Minhas disciplinas</h2><p>Acesse informações e acompanhe cada componente curricular.</p></section>
    <div className="cards-grid">{
      subjects.map(s => <div className="panel subject-card" key={s.name}>
        <span className="subject-code">2026 · CURSO</span>
        <h3>{s.name}</h3>
        <p>{s.teacher}</p>
        <div className="subject-footer">
          <span>Frequência {s.attendance}%</span>
          <span className="grade-badge">{s.grade}</span>
        </div>
      </div>)}
    </div>
  </AppLayout>;
}