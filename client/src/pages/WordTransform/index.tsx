import DataTable from "@/components/elements/DataTable";
import { jsonToPdf, downloadFile } from "@/functions/docxProcessor";
import { toJson } from "@/functions/xlsxProcessor";
import UploadIcon from "@/icon/Upload";
import { useState, ChangeEvent, useEffect } from "react";

import { Button } from "@/components/ui/button";

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
    <div className="w-full h-screen p-6 flex gap-[24px]">
      <DataViewComponent>
        {
          transformedData ? (
            <div className="h-full w-full max flex flex-col">
              <DataTable data={transformedData} name={excelFile?.name} />
            </div>
          ) : (
            <h1 className="text-2xl opacity-30 font-bold cursor-default select-none">Selecione uma base de dados</h1>
          )
        }
      </DataViewComponent>  
      <DataConfigComponent>
        <div className="flex flex-col gap-[24px]">
          <div>
            <input id="dataInput" className="hidden" type="file" onChange={handleExcelFileChange} accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
            <DataInput htmlFor="dataInput">
              {excelFile ? (
                <div className="flex flex-col items-center">
                  <UploadIcon/>
                  <p className="font-medium text-lg text-center">{excelFile?.name}</p>
                </div>
                
              ): (
                <div className="flex flex-col items-center">
                  <UploadIcon/>
                  <p>Upload dos Dados</p>
                </div>
              )}
              
            </DataInput>
          </div>
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
        
        <Button variant="secondary"  onClick={handleDownloadClick} disabled={finalBuffer ? false : true}>{finalBuffer ? "Baixar dados" : "Aguardando Dados..."}</Button>
      </DataConfigComponent>
    </div>
  )
}