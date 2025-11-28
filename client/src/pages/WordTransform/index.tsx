import { downloadFile, getVariables, jsonToDocx } from "@/functions/docxProcessor";
import UploadIcon from "@/icon/Upload";
import { ChangeEvent, useEffect, useState } from "react";


import RenderInputForm from "@/components/RenderInputForm";
import styled from "styled-components";

const DataViewComponent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content:center;
  color: white;

  overflow: auto;

  border-radius: 6px;

  border: 1px solid rgba(255, 255, 255, 0.6);
`

const DataConfigComponent = styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
`

const DataInput = styled.label`
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  display: block;
  cursor: pointer;
  width: 100%;
  aspect-ratio: 16/9;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;

  background-color: rgba(255, 255, 255, 0.04);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  p {
    font-weight: bolder;
    opacity: 0.6;
  }

`

export default function WordTransform() {
  const [wordFile, setWordFile] = useState<File | null>(null)
  const [variables, setVariables] = useState<string[]>([])

  const handleWordFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setWordFile(event.target.files[0]);
    }
  };
  const handleFormSubmit = async (values: any) => {
    if(!wordFile) return
    try {      const zipBlob = await jsonToDocx(values, wordFile);

      if (!zipBlob) {
        alert("Erro ao criar o arquivo.");
        return;
      }
      downloadFile(zipBlob, "documento.pdf");
    } catch (e) {
      console.error(e);
      alert("Erro ao gerar documento.");
    }
  };

  useEffect(() => {
    const func = async () => {
      const vars = await getVariables(wordFile)
      setVariables(vars)
      console.log(vars)
    }
    func()
  }, [wordFile]);

  return (
    <div className="w-full h-screen p-6 flex gap-[24px]">
      <DataViewComponent>
        {
          wordFile ? (
            <div className="h-full w-full max flex flex-col">
              <RenderInputForm variables={variables} onSubmitValues={handleFormSubmit}/>
            </div>
          ) : (
            <h1 className="text-2xl opacity-30 font-bold cursor-default select-none">Selecione um template</h1>
          )
        }
      </DataViewComponent>  
      <DataConfigComponent>
        <div className="flex flex-col gap-[24px]">
          <div>
            <input id="templateInput" className="hidden" type="file" onChange={handleWordFileChange} accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
            <DataInput htmlFor="templateInput">
              {wordFile ? (
                <div className="flex flex-col items-center">
                  <UploadIcon/>
                  <p className="font-medium text-lg text-center">{wordFile?.name}</p>
                </div>
                
              ): (
                <div className="flex flex-col items-center">
                  <UploadIcon/>
                  <p>Upload do Template</p>
                </div>
              )}
            </DataInput>
          </div>
        </div>
      </DataConfigComponent>
    </div>
  )
}