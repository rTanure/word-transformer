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
    <div className="w-full h-full first-line:rounded-md p-4 flex flex-col gap-2">  
      <p className=" text-lg text-white font-medium">Base de dados: {name}</p>
      <Separator className="opacity-10" />
      <ScrollArea className="w-full h-full pr-4 pb-4">
      
          <Table className="w-full">
            <TableCaption>Fim da sua base de dados</TableCaption>
            <TableHeader className="">
              <TableRow className="">
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
        <ScrollBar orientation="vertical"/>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
    </div>
  )
}