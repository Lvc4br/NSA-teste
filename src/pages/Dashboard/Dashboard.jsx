import React from "react";
import { ArrowRight, CalendarDays, CheckCheck, CheckCircle2, Clock3, FileText, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import StatCard from "../../components/common/StatCard";
import SectionHeader from "../../components/common/SectionHeader";
import { useAuth } from "../../context/AuthContext";
import { attendance, grades, nextClass, student, teacherClasses } from "../../services/mock/mockData";

export default function Dashboard() {
  const { user } = useAuth();

  if (user?.role === "Professor") {
    return <TeacherDashboard />;
  }

  return (
    <AppLayout>
      <section className="hero">
        <div>
          <span className="eyebrow">VISÃO GERAL</span>
          <h2>Olá, {user?.name || student.name} 👋</h2>
          <p>{student.course} · {student.module} · Turma {student.className}</p>
        </div>
        <div className="hero-date"><CalendarDays size={18}/> 04 de outubro de 2026</div>
      </section>

      <div className="stats-grid">
        <StatCard label="Frequência" value={`${attendance.percentage}%`} detail={`${attendance.absences} faltas registradas`} icon={<CheckCircle2 size={21}/>} tone="success"/>
        <StatCard label="Desempenho" value="B" detail="Menção geral atual" icon={<TrendingUp size={21}/>} />
        <StatCard label="Próxima aula" value={nextClass.time} detail={nextClass.subject} icon={<Clock3 size={21}/>} />
        <StatCard label="Pendências" value="2" detail="Itens para acompanhar" icon={<FileText size={21}/>} tone="warning"/>
      </div>

      <div className="dashboard-grid">
        <section className="panel next-class">
          <SectionHeader title="Próxima aula" action={<Link to="/horario" className="text-link">Ver horário <ArrowRight size={15}/></Link>}/>
          <div className="next-class-body">
            <div className="class-time">{nextClass.time}</div>
            <div>
              <span className="muted">Hoje · {nextClass.room}</span>
              <h3>{nextClass.subject}</h3>
              <p>{nextClass.teacher}</p>
            </div>
          </div>
        </section>

        <section className="panel">
          <SectionHeader title="Desempenho por disciplina" action={<Link to="/notas" className="text-link">Detalhes <ArrowRight size={15}/></Link>}/>
          <div className="progress-list">
            {grades.slice(0, 4).map(item => (
              <div className="progress-row" key={item.subject}>
                <div className="progress-title"><span>{item.subject}</span><strong>{item.grade}</strong></div>
                <div className="progress-track"><div className="progress-bar" style={{ width: `${item.progress}%` }}/></div>
                <small>{item.progress}% de desempenho estimado</small>
              </div>
            ))}
          </div>
        </section>

        <section className="panel quick-actions">
          <SectionHeader title="Acesso rápido"/>
          <div className="quick-grid">
            <Link to="/notas">📊 <span>Notas</span></Link>
            <Link to="/frequencia">📈 <span>Frequência</span></Link>
            <Link to="/horario">🗓️ <span>Calendário</span></Link>
            <Link to="/documentos">📄 <span>Documentos</span></Link>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function TeacherDashboard() {
  const { user } = useAuth();
  const today = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());
  const pendingAttendance = teacherClasses.filter(item => item.attendance === "Pendente").length;

  return (
    <AppLayout title="Início">
      <section className="hero">
        <div>
          <span className="eyebrow">VISÃO DO PROFESSOR</span>
          <h2>Olá, Professor(a) {user?.name} 👋</h2>
          <p>Confira suas aulas e chamadas previstas para hoje.</p>
        </div>
        <div className="hero-date"><CalendarDays size={18}/> {today}</div>
      </section>

      <div className="stats-grid">
        <StatCard label="Aulas hoje" value={teacherClasses.length} detail="Na agenda demonstrativa" icon={<CalendarDays size={21}/>} />
        <StatCard label="Chamadas pendentes" value={pendingAttendance} detail="Aguardando registro" icon={<Users size={21}/>} tone="warning"/>
        <StatCard label="Turmas" value="3" detail="Vinculadas ao perfil de exemplo" icon={<CheckCheck size={21}/>} tone="success"/>
        <StatCard label="Avaliações" value="2" detail="Exemplos para acompanhar" icon={<FileText size={21}/>} />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <SectionHeader title="Aulas de hoje"/>
          <div className="teacher-class-list">
            {teacherClasses.map(item => (
              <article className="teacher-class" key={item.id}>
                <strong className="teacher-class-time">{item.time}</strong>
                <div className="teacher-class-details">
                  <h3>{item.subject}</h3>
                  <p>Turma {item.className} · {item.room}</p>
                </div>
                <span className={`teacher-class-status ${item.attendance === "Pendente" ? "pending" : ""}`}>
                  {item.attendance}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <SectionHeader title="Acompanhe suas pendências"/>
          <div className="teacher-pending">
            <Clock3 size={19}/>
            <div><strong>{pendingAttendance} chamadas pendentes</strong><p>As chamadas são dados demonstrativos; o registro ainda não está conectado a um sistema.</p></div>
          </div>
          <div className="teacher-pending">
            <TrendingUp size={19}/>
            <div><strong>2 avaliações para acompanhar</strong><p>Exemplo de resumo para futuras tarefas de lançamento de notas.</p></div>
          </div>
          <div className="teacher-demo-note">
            Agenda, turmas e pendências são exemplos locais. Nenhuma chamada ou nota é salva.
          </div>
        </section>
      </div>
    </AppLayout>
  );
}