import Docxtemplater from "docxtemplater"
import PizZip from "pizzip"

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

const jsonToPdf = (data: Array<singleData>, template: File): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const templateBuffer = reader.result as ArrayBuffer;
      
      let zipedContent = new PizZip();
      let docxFolder = zipedContent.folder("docx")

      const renderPromises = data.map((value, index) => {
        return new Promise((resolveRender, rejectRender) => {
          let doc = new Docxtemplater();
          let zip = new PizZip(templateBuffer);

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