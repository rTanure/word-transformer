import "./global.css"

import React, { ChangeEvent, ReactNode, useState } from "react"


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

interface InputButtonProps {
  children: ReactNode
}

const InputButton: React.FC<InputButtonProps> = ({ children }) => {
  

  return (
    <div className="
      w-full 
      bg-slate-400 
      h-40
      rounded-lg 
      p-4
      saturate-50 
      cursor-pointer
      ease-linear
      duration-100
      gap-6

      flex

      hover:bg-slate-300
      
    ">{children}</div>
  )
}



function App(): JSX.Element {
  const [wordFile, setWordFile] = useState<File | null>(null)
  const [excelFile, setExcelFile] = useState<File | null>(null)

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


  return (
    <div className="w-screen h-screen  flex justify-end">
      <div className="bg-slate-800 h-screen w-96 flex gap-2  p-10 flex-col">
        <Dialog>
          <DialogTrigger>
            <InputButton > 
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
            </InputButton> 
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar um arquivo Word</DialogTitle>
              <Separator />
              <form action="none" onSubmit={(e)=>console.log(e)}>
                <input type="file" onChange={handleWordFileChange} accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        
        <Dialog>
          <DialogTrigger>
            <InputButton > 
              <div className="h-full w-20 flex justify-center items-center ">
                <ExcelIcon/> 
              </div>
              <div className="flex justify-center flex-col flex-1 text-left">
                <p className="text-2xl font-medium ">Excel</p>
                {wordFile ? (
                  <p className="opacity-70 text-sm">Selecionado: {excelFile?.name}</p>

                ): (
                  <p className="opacity-70 text-sm">A base dde dados dos seus documentos</p>
                )}
              </div>
            </InputButton> 
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar um arquivo Excel</DialogTitle>
              <Separator />
              <form action="none" onSubmit={(e)=>console.log(e)}>
                <input type="file" onChange={handleExcelFileChange} accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-slate-950 h-full flex-1 text-slate-100">
        <h1>Não há elementos</h1>

      </div> 
    </div>
  )
}

export default App
 