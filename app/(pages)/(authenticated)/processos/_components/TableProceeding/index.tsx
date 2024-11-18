import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { LuPencil, LuTrash } from "react-icons/lu";

const data = [
  {
    numero: "2024/0001",
    tipo: "Ação Civil Pública",
    partes: {
      autor: "Ministério Público",
      reu: "Empresa X",
    },
    status: "Em andamento",
    dataAbertura: "2024-01-15",
  },
  {
    numero: "2024/0002",
    tipo: "Ação Trabalhista",
    partes: {
      autor: "João Silva",
      reu: "Empresa Y",
    },
    status: "Aguardando audiência",
    dataAbertura: "2024-02-20",
  },
  {
    numero: "2024/0003",
    tipo: "Processo Penal",
    partes: {
      autor: "Estado",
      reu: "Carlos Oliveira",
    },
    status: "Julgado",
    dataAbertura: "2023-11-10",
  },
  {
    numero: "2024/0004",
    tipo: "Ação de Cobrança",
    partes: {
      autor: "Maria Souza",
      reu: "Pedro Santos",
    },
    status: "Em execução",
    dataAbertura: "2024-03-05",
  },
  {
    numero: "2024/0005",
    tipo: "Mandado de Segurança",
    partes: {
      autor: "Empresa Z",
      reu: "Estado",
    },
    status: "Em recurso",
    dataAbertura: "2024-04-12",
  },
];

export default function TableClients() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Réu</TableHead>
              <TableHead>Data de abertura</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((client, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{client.numero}</TableCell>
                <TableCell>{client.tipo}</TableCell>
                <TableCell>{client.partes.autor}</TableCell>
                <TableCell>{client.partes.reu}</TableCell>
                <TableCell>{client.dataAbertura}</TableCell>
                <TableCell className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <LuPencil />
                  </Button>
                  <Button variant="outline" size="sm">
                    <LuTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-right">
                {data.length} registros
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
