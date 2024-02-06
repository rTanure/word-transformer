import "./global.css"

import { ChangeEvent, useEffect, useState } from "react"


import WordIcon from "./icon/Word.jsx"
import ExcelIcon from "./icon/Excel.js"
import UploadIcon from "./icon/Upload.js"

import { Button } from "./components/ui/button.js"

import { toJson } from "./functions/xlsxProcessor.js"
import { downloadFile, jsonToPdf } from "./functions/docxProcessor.js"
import { Separator } from "./components/ui/separator.js"

import DataTable from "./components/elements/DataTable/index.js"


function App(): JSX.Element {
  const [wordFile, setWordFile] = useState<File | null>(null)
  const [excelFile, setExcelFile] = useState<File | null>(null)

  const [transformedData, setTransformedData] = useState<null | Array<any>>(null)
  const [finalBuffer, setFinalBuffer] =  useState<null | Blob>(null)

  const handleWordFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setWordFile(event.target.files[0]);
    }
  };

  const handleExcelFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setExcelFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (!excelFile) return;
    const fetchData = async () => {
      try {
        const data = await toJson(excelFile);
        setTransformedData(data);
        console.log(transformedData)
      } catch (error) {
        console.error("Erro ao transformar os dados do arquivo:", error);
      }
    };
  
    fetchData();
  }, [excelFile]);

  useEffect(() => {
    if (!transformedData || !wordFile) return;
  
    jsonToPdf(transformedData, wordFile)
      .then((pdfBlob) => {
        setFinalBuffer(pdfBlob);
      })
      .catch((error) => {
        console.error("Erro ao converter para PDF:", error);
      });
  }, [wordFile, transformedData]);

  const handleDownloadClick = () => {
    downloadFile(finalBuffer, "files.zip")
  }

  return (
    <div className="w-screen h-screen  flex justify-end">
      <div className="bg-slate-800 h-screen w-96 flex gap-10  p-10 flex-col">
        <label htmlFor="templateInput" className=" w-full bg-slate-400 h-40 rounded-lg p-4 saturate-50 cursor-pointer ease-linear duration-100 gap-6 flex hover:bg-slate-300" > 
          <input id="templateInput" className="hidden" type="file" onChange={handleWordFileChange} accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
          <div className="h-full w-20 flex flex-col justify-center items-center ">
            <WordIcon/> 
            <p className="text-2xl font-medium ">Word</p>
          </div>
          <div className="flex justify-center flex-col flex-1 text-left">
            {wordFile ? (
              <div>
                <p className="opacity-70 text-sm text-center">Selecionado:</p>
                <p className="font-medium text-lg text-center">{wordFile?.name}</p>
              </div>
              
            ): (
              <div className="flex flex-col items-center">
                <div className="size-10 flex items-center justify-center">
                  <UploadIcon />
                </div>
                <p className="font-medium text-lg text-center">Template</p>
              </div>
            )}
          </div>
        </label> 


        
        <label htmlFor="dataInput" className=" w-full bg-slate-400 h-40 rounded-lg p-4 saturate-50 cursor-pointer ease-linear duration-100 gap-6 flex hover:bg-slate-300" > 
          <input id="dataInput" className="hidden" type="file" onChange={handleExcelFileChange} accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
          <div className="h-full w-20 flex flex-col justify-center items-center ">
            <ExcelIcon /> 
            <p className="text-2xl font-medium ">Excel</p>
          </div>
          <div className="flex justify-center flex-col flex-1 text-left">
            {excelFile ? (
              <div>
                <p className="opacity-70 text-sm text-center">Selecionado:</p>
                <p className="font-medium text-lg text-center">{excelFile?.name}</p>
              </div>
              
            ): (
              <div className="flex flex-col items-center">
                <div className="size-10 flex items-center justify-center">
                  <UploadIcon />
                </div>
                <p className="font-regular text-lg text-center">Base de Dados</p>
              </div>
            )}
          </div>
        </label> 

        <Separator className="bg-slate-700"/>

        <Button onClick={handleDownloadClick} className="" variant="secondary" disabled={finalBuffer ? false : true}>
          {finalBuffer ? "Baixar dados" : "Aguardando Dados..."}
        </Button>
      </div>
      <div className="bg-slate-950 h-full flex-1 text-slate-100 flex items-center justify-center p-10" style={{width: "calc(100vw - 24rem)"}}>
        {
          transformedData ? (
            <div className="h-full w-full max flex flex-col">
              <DataTable data={transformedData} name={excelFile?.name} />
            </div>
          ) : (
            <h1 className="text-2xl opacity-30 font-bold cursor-default select-none">Selecione uma base de dados</h1>
          )
        }
      </div> 
    </div>
  )
}

export default App
 