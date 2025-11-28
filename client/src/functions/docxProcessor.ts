import Docxtemplater from "docxtemplater"
import PizZip from "pizzip"
import InspectModule from "docxtemplater/js/inspect-module";


interface singleData {
  name: string
}

function downloadFile(blob: any, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename; 
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export async function getVariables(template?: File | null): Promise<string[]> {
  return new Promise((resolve, reject) => {
    
    if(!template) resolve([])
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const templateBuffer = reader.result as ArrayBuffer;

        const zip = new PizZip(templateBuffer);
        const inspectModule = new InspectModule();

        new Docxtemplater(zip, {
          modules: [inspectModule]
        });

        // Retorna todas as tags encontradas (como chaves do objeto)
        const variables = Object.keys(inspectModule.getAllTags());

        resolve(variables);
      } catch (e) {
        reject(e);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(template as Blob);
  });
}

export const jsonToDocx = (data: singleData, template: File): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const templateBuffer = reader.result as ArrayBuffer;
        const zip = new PizZip(templateBuffer);

        const doc = new Docxtemplater();
        doc.loadZip(zip);
        doc.setData(data); // usa os valores recebidos

        doc.render();

        // Gera o .docx diretamente (não mais ZIP)
        const wordFile = doc.getZip().generate({ type: "blob" });

        resolve(wordFile);
      } catch (error) {
        console.error("Erro ao gerar DOCX", error);
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(template);
  });
};

const jsonToPdf = (data: Array<singleData>, template: File): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const templateBuffer = reader.result as ArrayBuffer;
      
      const zipedContent = new PizZip();
      const docxFolder = zipedContent.folder("docx")

      const renderPromises = data.map((value, index) => {
        return new Promise((resolveRender, rejectRender) => {
          const doc = new Docxtemplater();
          const zip = new PizZip(templateBuffer);

          doc.loadZip(zip); // Carrega o template
          doc.setData(value); // Insere os valores

          try {
            doc.render(); // Renderiza o documento
            const wordFile = doc.getZip().generate({ type: 'blob' }); // Gera um blob do documento

            const fileReader = new FileReader();
            fileReader.onload = async () => {
              const arrayBuffer = fileReader.result as ArrayBuffer;

              docxFolder.file(`nome_${index}.docx`, arrayBuffer);
              resolveRender(null);
            };
            fileReader.readAsArrayBuffer(wordFile);
          } catch (error) {
            console.error("Erro ao renderizar o documento", error);
            rejectRender(error);
          }
        });
      });

      Promise.all(renderPromises)
        .then(() => {
          const zipBlob = zipedContent.generate({ type: 'blob' });
          resolve(zipBlob);
        })
        .catch(error => {
          console.error("Erro ao processar os documentos", error);
          reject(error);
        });
    };

    reader.onerror = (error) => {
      console.error("Erro ao ler o template", error);
      reject(error);
    };

    reader.readAsArrayBuffer(template);
  });
};



export {
  jsonToPdf,
  downloadFile
}