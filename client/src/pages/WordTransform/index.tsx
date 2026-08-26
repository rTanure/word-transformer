import { ChangeEvent, useEffect, useRef, useState } from "react";

import RenderInputForm from "@/components/RenderInputForm";
import {
  downloadFile,
  getTemplateSchema,
  jsonToDocx,
  type TemplateData,
  type TemplateNode,
} from "@/functions/docxProcessor";

const STORED_TEMPLATE_KEY = "word-transformer:last-template";

interface StoredTemplate {
  name: string;
  type: string;
  lastModified: number;
  dataUrl: string;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function dataUrlToFile(stored: StoredTemplate): File {
  const commaIndex = stored.dataUrl.indexOf(",");
  if (commaIndex === -1) throw new Error("Template salvo inválido");

  const binary = window.atob(stored.dataUrl.slice(commaIndex + 1));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new File([bytes], stored.name, {
    type: stored.type,
    lastModified: stored.lastModified,
  });
}

async function saveTemplate(file: File) {
  const dataUrl = await fileToDataUrl(file);
  const stored: StoredTemplate = {
    name: file.name,
    type: file.type,
    lastModified: file.lastModified,
    dataUrl,
  };
  window.localStorage.setItem(STORED_TEMPLATE_KEY, JSON.stringify(stored));
}

function readStoredTemplate(): File | null {
  const rawTemplate = window.localStorage.getItem(STORED_TEMPLATE_KEY);
  if (!rawTemplate) return null;
  return dataUrlToFile(JSON.parse(rawTemplate) as StoredTemplate);
}

function outputName(templateName: string) {
  const baseName = templateName.replace(/\.docx$/i, "");
  return `${baseName}-preenchido.docx`;
}

export default function WordTransform() {
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [schema, setSchema] = useState<TemplateNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const processingId = useRef(0);

  const loadTemplate = async (file: File, persist: boolean) => {
    const currentId = ++processingId.current;
    setLoading(true);
    setMessage(null);

    try {
      const nextSchema = await getTemplateSchema(file);
      if (currentId !== processingId.current) return;
      setWordFile(file);
      setSchema(nextSchema);

      if (persist) {
        try {
          await saveTemplate(file);
        } catch (error) {
          console.error("Não foi possível salvar o template", error);
          setMessage("Template carregado, mas o navegador não conseguiu salvá-lo para a próxima visita.");
        }
      }
    } catch (error) {
      console.error("Erro ao ler o template", error);
      if (currentId === processingId.current) {
        setMessage("Não foi possível ler esse template. Confira se o arquivo é um .docx válido.");
      }
    } finally {
      if (currentId === processingId.current) setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const storedTemplate = readStoredTemplate();
      if (storedTemplate) {
        void loadTemplate(storedTemplate, false);
        return;
      }
    } catch (error) {
      console.error("Não foi possível restaurar o template", error);
      window.localStorage.removeItem(STORED_TEMPLATE_KEY);
    }
    setLoading(false);
  }, []);

  const handleWordFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) void loadTemplate(file, true);
  };

  const handleFormSubmit = async (values: TemplateData) => {
    if (!wordFile) return;
    setMessage(null);
    try {
      const document = await jsonToDocx(values, wordFile);
      downloadFile(document, outputName(wordFile.name));
    } catch (error) {
      console.error("Erro ao gerar documento", error);
      setMessage("O documento não pôde ser gerado. Verifique as tags do template.");
    }
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="brand-mark" aria-hidden="true">W</div>
        <div>
          <h1>Preencher documento</h1>
          <p>Use um template do Word e gere o arquivo pronto no navegador.</p>
        </div>
      </header>

      <section className="template-picker" aria-label="Template do Word">
        <div className="file-summary">
          <div className="file-icon" aria-hidden="true">DOCX</div>
          <div>
            <strong>{wordFile?.name ?? "Nenhum template selecionado"}</strong>
            <span>
              {wordFile
                ? "Este template será aberto automaticamente na próxima visita."
                : "Selecione um arquivo .docx para começar."}
            </span>
          </div>
        </div>
        <label className="secondary-button file-button" htmlFor="templateInput">
          {wordFile ? "Trocar template" : "Selecionar template"}
        </label>
        <input
          id="templateInput"
          className="visually-hidden"
          type="file"
          onChange={handleWordFileChange}
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
      </section>

      {message && <div className="notice" role="alert">{message}</div>}

      <div className="content-grid">
        <section className="panel form-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Dados</span>
              <h2>Campos do documento</h2>
            </div>
            {wordFile && !loading && <span className="tag-count">{schema.length} campos ou blocos</span>}
          </div>

          {loading ? (
            <div className="empty-state">Lendo o template…</div>
          ) : wordFile ? (
            <>
              {schema.length === 0 && (
                <p className="inline-help">Nenhuma tag foi encontrada. Ainda é possível gerar uma cópia do documento.</p>
              )}
              <RenderInputForm schema={schema} onSubmitValues={handleFormSubmit} />
            </>
          ) : (
            <div className="empty-state">
              <strong>Adicione um template para ver os campos.</strong>
              <span>As tags entre chaves serão transformadas em inputs.</span>
            </div>
          )}
        </section>

        <aside className="panel guide-panel">
          <span className="eyebrow">Guia rápido</span>
          <h2>Como montar o template</h2>

          <div className="guide-item">
            <span>Campo simples</span>
            <code>{"{nome}"}</code>
            <p>Cria um campo de texto chamado “Nome”.</p>
          </div>

          <div className="guide-item">
            <span>Loop</span>
            <code>{"{#itens}{descricao} — {valor}{/itens}"}</code>
            <p>Na aplicação, escolha “Lista” e adicione quantos itens precisar.</p>
          </div>

          <div className="guide-item">
            <span>Condição</span>
            <code>{"{#mostrar_endereco}...{/mostrar_endereco}"}</code>
            <p>Escolha “Condição” para decidir se o trecho aparece no documento.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
