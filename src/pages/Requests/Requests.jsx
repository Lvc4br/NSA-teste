import React, { useState } from "react";
import { AlertCircle, CheckCircle2, FileUp } from "lucide-react";
import AppLayout from "../../components/layout/AppLayout";

const initialRequests = [
  ["#NSA-2026-001482", "Declaração de matrícula", "Concluída"],
  ["#NSA-2026-001519", "Histórico escolar", "Em análise"],
  ["#NSA-2026-001544", "Aproveitamento de estudos", "Aguardando documentação"],
];

const maxFileSize = 10 * 1024 * 1024;
const acceptedFileTypes = ["application/pdf", "image/jpeg", "image/png"];

export default function Requests() {
  const [requests, setRequests] = useState(initialRequests);
  const [documentType, setDocumentType] = useState("Atestado");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [submittedProtocol, setSubmittedProtocol] = useState("");

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0] || null;
    setSubmittedProtocol("");

    if (!selectedFile) {
      setFile(null);
      setFileError("");
      return;
    }

    if (!acceptedFileTypes.includes(selectedFile.type)) {
      setFile(null);
      setFileError("Selecione um arquivo PDF, JPG ou PNG.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > maxFileSize) {
      setFile(null);
      setFileError("O arquivo deve ter no máximo 10 MB.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
    setFileError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setFileError("Anexe o documento antes de registrar a solicitação.");
      return;
    }

    const protocol = `#NSA-DEMO-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    setRequests(current => [[protocol, documentType, "Registrada (demonstração)"], ...current]);
    setSubmittedProtocol(protocol);
    setFile(null);
    setFileError("");
    event.currentTarget.reset();
    setDocumentType("Atestado");
  }

  return (
    <AppLayout title="Solicitações">
      <section className="page-intro">
        <span className="eyebrow">ATENDIMENTO</span>
        <h2>Atestados e cartas de horas</h2>
        <p>Preencha os dados e anexe o documento para registrar sua solicitação.</p>
      </section>

      <div className="request-demo-notice" role="note">
        <AlertCircle size={18} />
        <p>
          Protótipo: o arquivo não é enviado à ETEC nem fica salvo. O protocolo
          abaixo é apenas demonstrativo e será apagado ao recarregar a página.
        </p>
      </div>

      <section className="panel request-form-panel">
        <h3>Nova solicitação</h3>
        <form className="request-form" onSubmit={handleSubmit}>
          <label>
            Tipo de documento
            <select
              value={documentType}
              onChange={event => {
                setDocumentType(event.target.value);
                setSubmittedProtocol("");
              }}
            >
              <option value="Atestado">Atestado</option>
              <option value="Carta de horas">Carta de horas</option>
            </select>
          </label>

          <label>
            Data do documento
            <input type="date" required />
          </label>

          <label className="request-file-field">
            Anexar documento
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              onChange={handleFileChange}
              aria-describedby="request-file-help request-file-error"
            />
            <span id="request-file-help" className="request-field-help">
              PDF, JPG ou PNG; tamanho máximo de 10 MB.
            </span>
            {file && <span className="request-selected-file">{file.name}</span>}
            {fileError && <span id="request-file-error" className="request-field-error" role="alert">{fileError}</span>}
          </label>

          <label className="request-details-field">
            Observações (opcional)
            <textarea rows="3" maxLength="500" placeholder="Inclua alguma informação importante para a secretaria." />
          </label>

          <button className="primary-button request-submit" type="submit">
            <FileUp size={17} />
            Registrar solicitação
          </button>
        </form>

        {submittedProtocol && (
          <div className="request-success" role="status">
            <CheckCircle2 size={18} />
            <span>
              Solicitação registrada apenas nesta demonstração. Protocolo: <strong>{submittedProtocol}</strong>
            </span>
          </div>
        )}
      </section>

      <section className="panel table-panel request-history">
        <h3>Minhas solicitações</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Protocolo</th><th>Solicitação</th><th>Status</th></tr>
            </thead>
            <tbody>
              {requests.map(([protocol, type, status]) => (
                <tr key={protocol}>
                  <td><strong>{protocol}</strong></td>
                  <td>{type}</td>
                  <td>
                    <span className={`status ${status === "Concluída" ? "done" : "pending"}`}>{status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppLayout>
  );
}
