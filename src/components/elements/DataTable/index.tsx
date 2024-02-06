import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption } from "@/components/ui/table";

interface dataTableProps {
  data: Array<singleDataProps>
  name: string | undefined
}

interface singleDataProps {
  [key: string]: string;
}

export default function DataTable({ data, name}: dataTableProps) {
  const dataKeys = Object.keys(data[0])
  
  return (
    <div className="w-full h-full bg-slate-900 rounded-md p-4 ">  
      <p className="mb-2 text-lg text-slate-400 font-medium">Base de dados: {name}</p>
    <Separator className="opacity-10" />
      <ScrollArea className=" max-w-full h-80 flex-1 h-full">
      
          <Table className="w-full h-full">
            <TableCaption>Fim da sua base de dados</TableCaption>
            <TableHeader >
              <TableRow>
                {dataKeys.map((value, index)=>(
                  <TableHead key={index}>{value}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                data.map((value, index)=>(
                  <TableRow key={index}>
                    {
                      Object.keys(value).map((key) => (
                        <TableCell key={key}>{value[key]}</TableCell>
                      ))
                    }
                  </TableRow>
                ))
              }
              
            </TableBody>
          </Table>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
    </div>
  )
}