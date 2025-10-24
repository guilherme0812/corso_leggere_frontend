"use client";

import { IAttorney } from "@/app/_services/attorney";
import { apiServerLeggere } from "@/app/_services/api";
import { IClient } from "@/app/_services/client";
import DocumentGeneratorCard from "../DocumentGeneratorCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";

type ContentType = {
  attorneys: IAttorney[];
  clients: IClient[];
};

export async function downloadDocument(formData: FormData) {
  try {
    const response = await apiServerLeggere.post("/document/replacePlceholders", formData, {
      responseType: "blob", // 👈 importante para receber o arquivo binário
    });

    // Cria um URL temporário para o arquivo recebido
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "documento-gerado.docx"; // nome do arquivo baixado
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Libera o objeto URL da memória
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao baixar documento:", error);
  }
}

function Content({ attorneys, clients }: ContentType) {
  return (
    <div className="max-w-[1700px] m-auto">
      <Tabs defaultValue="account" className="">
        <div className="bg-white shadow-md p-4 mb-4">
          <div className="mb-2 font-medium">Gerador de documentos</div>
          <TabsList>
            <TabsTrigger value="1">Configurações</TabsTrigger>
            <TabsTrigger value="2">Gerar documento</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="1"></TabsContent>
        <TabsContent value="2" className="w-full">
          <DocumentGeneratorCard {...{ attorneys, clients }} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Content;
