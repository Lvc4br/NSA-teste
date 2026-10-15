import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import SectionHeader from "../../components/common/SectionHeader";
import { grades } from "../../services/mock/mockData";

export default function Grades() {
  return <AppLayout title="Notas">
    <section className="page-intro"><span className="eyebrow">ACADÊMICO</span><h2>Seu desempenho</h2><p>Acompanhe suas menções e evolução por disciplina.</p></section>
    <div className="panel table-panel">
      <SectionHeader title="Disciplinas"/>
      <div className="table-wrap"><table><thead><tr><th>Disciplina</th><th>Professor</th><th>Desempenho</th><th>Menção</th></tr></thead>
      <tbody>{grades.map(g => <tr key={g.subject}><td><strong>{g.subject}</strong></td><td>{g.teacher}</td><td><div className="mini-progress"><div style={{width:`${g.progress}%`}}/></div><span className="table-number">{g.progress}%</span></td><td><span className="grade-badge">{g.grade}</span></td></tr>)}</tbody></table></div>
    </div>
  </AppLayout>;
}