import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";

const data = [
  {
    nome: "João Silva",
    cidade: "São Paulo",
    estado: "SP",
    endereco: "Rua das Flores, 123",
    telefone: "(11) 91234-5678",
    email: "joao.silva@example.com",
    dataNascimento: "1985-05-15",
    cpf: "123.456.789-00",
  },
  {
    nome: "Maria Oliveira",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    endereco: "Avenida Atlântica, 456",
    telefone: "(21) 98765-4321",
    email: "maria.oliveira@example.com",
    dataNascimento: "1990-08-22",
    cpf: "987.654.321-00",
  },
  {
    nome: "Carlos Souza",
    cidade: "Belo Horizonte",
    estado: "MG",
    endereco: "Rua Minas Gerais, 789",
    telefone: "(31) 99876-5432",
    email: "carlos.souza@example.com",
    dataNascimento: "1982-12-10",
    cpf: "456.123.789-00",
  },
  {
    nome: "Ana Lima",
    cidade: "Porto Alegre",
    estado: "RS",
    endereco: "Avenida Ipiranga, 101",
    telefone: "(51) 97654-3210",
    email: "ana.lima@example.com",
    dataNascimento: "1978-04-05",
    cpf: "789.456.123-00",
  },
  {
    nome: "Pedro Rocha",
    cidade: "Curitiba",
    estado: "PR",
    endereco: "Rua XV de Novembro, 222",
    telefone: "(41) 96543-2109",
    email: "pedro.rocha@example.com",
    dataNascimento: "1988-09-18",
    cpf: "321.987.654-00",
  },
  {
    nome: "Luciana Mendes",
    cidade: "Salvador",
    estado: "BA",
    endereco: "Avenida Sete de Setembro, 333",
    telefone: "(71) 93456-7890",
    email: "luciana.mendes@example.com",
    dataNascimento: "1995-11-23",
    cpf: "654.321.987-00",
  },
  {
    nome: "Rafael Ferreira",
    cidade: "Fortaleza",
    estado: "CE",
    endereco: "Rua da Paz, 444",
    telefone: "(85) 94321-8765",
    email: "rafael.ferreira@example.com",
    dataNascimento: "1983-02-14",
    cpf: "111.222.333-44",
  },
  {
    nome: "Beatriz Campos",
    cidade: "Brasília",
    estado: "DF",
    endereco: "SQN 202 Bloco A, 555",
    telefone: "(61) 96543-2121",
    email: "beatriz.campos@example.com",
    dataNascimento: "1975-06-30",
    cpf: "222.333.444-55",
  },
  {
    nome: "Roberto Costa",
    cidade: "Recife",
    estado: "PE",
    endereco: "Rua da Aurora, 666",
    telefone: "(81) 97654-1234",
    email: "roberto.costa@example.com",
    dataNascimento: "1969-03-20",
    cpf: "333.444.555-66",
  },
  {
    nome: "Paula Ribeiro",
    cidade: "Florianópolis",
    estado: "SC",
    endereco: "Rua das Palmeiras, 777",
    telefone: "(48) 98765-4321",
    email: "paula.ribeiro@example.com",
    dataNascimento: "1992-12-12",
    cpf: "444.555.666-77",
  },
];

export default function TableClients() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((client) => (
              <TableRow key={client.cpf}>
                <TableCell className="font-medium">{client.nome}</TableCell>
                <TableCell>
                  {client.cidade} - {client.estado}
                </TableCell>
                <TableCell>{client.telefone}</TableCell>
                <TableCell>{client.email}</TableCell>
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
