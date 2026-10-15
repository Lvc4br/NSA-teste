import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { FileText, Download } from "lucide-react";

const docs = ["Declaração de matrícula", "Histórico escolar", "Boletim acadêmico"];

export default function Documents() {
  return <AppLayout title="Documentos">
    <section className="page-intro"><span className="eyebrow">SECRETARIA</span><h2>Meus documentos</h2><p>Acesso rápido aos documentos acadêmicos.</p></section>
    <div className="panel document-list">{docs.map(d => <div className="document-row" key={d}><div className="document-icon"><FileText size={20}/></div><div><strong>{d}</strong><span>Disponível para consulta</span></div><button className="secondary-button"><Download size={16}/> Baixar</button></div>)}</div>
  </AppLayout>;
}