import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { schedule } from "../../services/mock/mockData";

export default function Schedule() {
  return <AppLayout title="Horário">
    <section className="page-intro"><span className="eyebrow">ORGANIZAÇÃO</span><h2>Minha semana</h2><p>Próximas aulas e locais.</p></section>
    <div className="schedule-list">{schedule.map(item => <div className="schedule-item panel" key={item.day}><div className="schedule-day">{item.day}</div><div className="schedule-time">{item.time}</div><div><h3>{item.subject}</h3><p>{item.teacher} · {item.room}</p></div></div>)}</div>
  </AppLayout>;
}