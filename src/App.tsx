import "./global.css"

import React, { ChangeEvent, ReactNode, useEffect, useState } from "react"


import WordIcon from "./icon/Word.jsx"
import ExcelIcon from "./icon/Excel.js"

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "./components/ui/separator.js"
import { Button } from "./components/ui/button.js"

import { toJson } from "./components/functions/xlsxProcessor.js"
import { downloadFile, jsonToPdf } from "./components/functions/docxProcessor.js"

interface InputButtonProps {
  children: ReactNode
}

const InputButton: React.FC<InputButtonProps> = ({ children }) => {
  

  return (
    <div className="
      
      
    ">{children}</div>
  )
}



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
      <div className="bg-slate-800 h-screen w-96 flex gap-2  p-10 flex-col">
        <label htmlFor="templateInput" className="block w-full bg-slate-400 h-40 rounded-lg p-4 saturate-50 cursor-pointer ease-linear duration-100 gap-6 flex hover:bg-slate-300" > 
          <input id="templateInput" className="hidden" type="file" onChange={handleWordFileChange} accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
          <div className="h-full w-20 flex justify-center items-center ">
            <WordIcon/> 
          </div>
          <div className="flex justify-center flex-col flex-1 text-left">
            <p className="text-2xl font-medium ">Word</p>
            {wordFile ? (
              <p className="opacity-70 text-sm">Selecionado: {wordFile?.name}</p>
            ): (
              <p className="opacity-70 text-sm">A base para a produção dos seus documentos</p>
            )}
          </div>
        </label> 


        
        <label htmlFor="dataInput" className="block w-full bg-slate-400 h-40 rounded-lg p-4 saturate-50 cursor-pointer ease-linear duration-100 gap-6 flex hover:bg-slate-300" > 
          <input id="dataInput" className="hidden" type="file" onChange={handleExcelFileChange} accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
          <div className="h-full w-20 flex justify-center items-center ">
            <ExcelIcon/> 
          </div>
          <div className="flex justify-center flex-col flex-1 text-left">
            <p className="text-2xl font-medium ">Excel</p>
            {excelFile ? (
              <p className="opacity-70 text-sm">Selecionado: {excelFile?.name}</p>

            ): (
              <p className="opacity-70 text-sm">A base dde dados dos seus documentos</p>
            )}
          </div>
        </label> 



        <Button onClick={handleDownloadClick} className="mt-8" variant="secondary" disabled={finalBuffer ? false : true}>Baixar arquivos</Button>
        <span className=" text-center text-slate-400 text-sm">os dados devem estar completos para baixar o arquivo</span>
      </div>
      <div className="bg-slate-950 h-full flex-1 text-slate-100 flex items-center justify-center">
        {
          transformedData ? (
            <h1 className="text-2xl opacity-30 font-bold cursor-default select-none">Base de dados selecionada</h1>
          ) : (
            <h1 className="text-2xl opacity-30 font-bold cursor-default select-none">Selecione uma base de dados</h1>
          )
        }
      </div> 
    </div>
  )
}

export default App
 