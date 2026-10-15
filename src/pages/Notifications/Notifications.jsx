import React from "react";
import { BellOff } from "lucide-react";
import AppLayout from "../../components/layout/AppLayout";

export default function Notifications() {
  return <AppLayout title="Notificações">
    <section className="page-intro">
      <span className="eyebrow">COMUNICAÇÃO</span>
      <h2>Notificações temporariamente desativadas</h2>
      <p>Esta área será retomada quando as notificações forem integradas ao banco de dados.</p>
    </section>
    <div className="panel notification-disabled">
      <BellOff size={22}/>
      <p>Por enquanto, não há notificações disponíveis para exibir.</p>
    </div>
  </AppLayout>;
}