import { read, utils } from "xlsx"
// import {jsonfile} from "jsonfile"

const toJson = (element: File): Promise<any[] | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event || !event.target) {
        reject(new Error("Erro ao ler o arquivo"));
        return;
      }
      
      const data = event.target.result as string;
      const workbook = read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const dataSheets = utils.sheet_to_json(worksheet);

      resolve(dataSheets);
    };

    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo"));
    };

    if (element) {
      reader.readAsBinaryString(element);
    } else {
      reject(new Error("Nenhum arquivo selecionado"));
    }
  });
};

export {toJson}