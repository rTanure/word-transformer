import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption } from "@/components/ui/table";

interface dataTableProps {
  data: Array<singleDataProps>
}

interface singleDataProps {
  [key: string]: string;
}

export default function DataTable({ data }: dataTableProps) {
  const dataKeys = Object.keys(data[0])
  
  return (
    <ScrollArea className="bg-slate-900 rad rounded-md p-4 w-full h-full flex-1">
      <Table className="">
        <TableCaption>Fim da sua base de dados</TableCaption>
        <TableHeader className="sticky">
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
    </ScrollArea>
  )
}