"use client";

import { Button } from "@/app/_components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { IAttorney } from "@/app/_services/attorney";
import { useEffect, useState } from "react";
import { IoCheckmarkCircleSharp, IoCheckmarkOutline } from "react-icons/io5";

import { apiLeggere, apiServerLeggere } from "@/app/_services/api";
import { Label } from "@/app/_components/ui/Label";
import { IClient } from "@/app/_services/client";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/app/_services/cities";
import { GenerateDocumentBodyType, ReplacePlaceholdersBody } from "@/app/_services/customDocumentMapping";
import { formatDocument, formatPhone, formatZipCode } from "@/app/_utils/stringFomatters";
import { numberFormat } from "@/app/_utils";

type ContentType = {
  attorneys: IAttorney[];
  clients: IClient[];
  customMappingJson: GenerateDocumentBodyType;
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

function DocumentGeneratorCard({ attorneys, clients, customMappingJson }: ContentType) {
  const [step, setStep] = useState(0);
  const [selectedAttorney, setSelectedAttorney] = useState<string>();
  const [selectedClient, setSelectedClient] = useState<string>();
  const [client, setClient] = useState<IClient>();

  const [file, setFile] = useState<File | null>(null);
  const [buildedDocument, setBuildedDocument] = useState(false);

  const { data: cities } = useQuery({
    queryKey: ["cities", client?.cityId],
    queryFn: () => getCities(client?.stateId as string),
    enabled: !!client?.cityId,
  });

  const handleDownload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const grantor = clients.find((item) => item.document == selectedClient) as IClient;
    const grantee = attorneys.find((item) => item.id == selectedAttorney) as IAttorney;

    const base_json: GenerateDocumentBodyType = {
      grantor: {
        document: formatDocument(grantor?.document || ""),
        officialId: formatDocument(grantor.officialId || ""),
        officialIdIssuingBody: grantor.officialIdIssuingBody,
        officialIdissuingState: grantor.officialIdissuingState,
        phone: formatPhone(grantor?.phone),
        email: grantor?.email || "",
        addressStreet: grantor?.addressStreet || "",
        addressNumber: numberFormat(Number(grantor?.addressNumber) || 0),
        addressComplement: grantor?.addressComplement,
        addressZipCode: formatZipCode(grantor?.addressZipCode || ""),
        zone: grantor?.zone || "",
        birthDate: grantor?.birthDate || "",
        nacionality: grantor?.nacionality || "",
        maritalStatus: grantor?.maritalStatus || "",
        profession: grantor?.profession || "",
        stateId: grantor?.stateId || "",
        countryId: grantor?.countryId || "",
        name: grantor?.firstName + " " + grantor?.lastName,
        city: cities?.find((item) => item.id == (client?.cityId as any))?.nome || "",
      },
      grantee: {
        name: grantee?.firstName + " " + grantee?.lastName,
        licenceNumber: grantee?.licenceNumber,
        licenceJurisdiction: grantee?.licenceJurisdiction,
        licenceCountryCode: grantee?.licenceCountryCode,
        phone: grantee?.phone,
        email: grantee?.email,
        nationality: grantee?.nationality,
        maritalStatus: grantee?.maritalStatus,
        professionalAddress: grantee?.professionalAddress,
      },
    };

    const data: ReplacePlaceholdersBody = {
      base_json,
      mapping_json: customMappingJson,
    };

    formData.append("data", JSON.stringify(data));

    try {
      const res = await apiLeggere.post(
        "/document/replacePlceholders",
        formData,
        { responseType: "blob" } // 👈 necessário para blob
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "documento-gerado.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      if (res.status != 400) {
        setBuildedDocument(true);
      }
    } catch (err) {
      console.error("Erro ao baixar documento:", err);
    }
    console.log("data", data);
  };

  const handleClick = () => {
    if (step == 0) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
      handleDownload();
    }
  };

  useEffect(() => {
    if (selectedClient) {
      setClient(() => clients?.find((item) => item.document == selectedClient));
    }
  }, [selectedClient]);

  return (
    <div className="max-w-screen-sm m-auto  min-h-[400px] gap-4 flex flex-col justify-between">
      {/* header */}
      <header className="flex justify-between">
        <div className="flex-grow">
          <div className="relative flex justify-center">
            <div className="h-1 absolute w-1/2 bg-slate-400 right-0 top-[13px]"></div>
            <div className="bg-background z-10 rounded-full p-1">
              <div className="bg-yellow-600 h-[1.5rem] w-[1.5rem] rounded-full flex justify-center items-center text-white">
                {selectedClient && selectedAttorney ? <IoCheckmarkOutline className="text-xl z-10" /> : 1}
              </div>
            </div>
          </div>
          <div className="text-sm text-center">Informações</div>
        </div>

        <div className="flex-grow">
          <div className="relative flex justify-center">
            <div className="h-1 absolute w-1/2 bg-slate-400 left-0 top-[13px]"></div>
            <div className="h-1 absolute w-1/2 bg-slate-400 right-0 top-[13px]"></div>
            <div className="bg-background z-10 rounded-full p-1">
              <div className="bg-yellow-600 h-[1.5rem] w-[1.5rem] rounded-full flex justify-center items-center text-white">
                {file?.name ? <IoCheckmarkOutline className="text-xl z-10" /> : 2}{" "}
              </div>
            </div>
          </div>
          <div className="text-sm text-center">Selecione o documento</div>
        </div>

        <div className="flex-grow">
          <div className="relative flex justify-center">
            <div className="h-1 absolute w-1/2 bg-slate-400 left-0 top-[13px]"></div>
            <div className="bg-background z-10 rounded-full p-1">
              <div className="bg-yellow-600 h-[1.5rem] w-[1.5rem] rounded-full flex justify-center items-center text-white">
                {buildedDocument ? <IoCheckmarkOutline className="text-xl z-10" /> : 3}{" "}
              </div>
            </div>
          </div>
          <div className="text-sm text-center">Baixar documento</div>
        </div>
      </header>

      <div className="p-6 bg-white rounded-2xl shadow-custom">
        {step == 0 ? (
          <div>
            <div className="mb-4">
              <Label className="mb-1">Outorgante</Label>
              <Select value={selectedClient} onValueChange={(value) => setSelectedClient(value)}>
                <SelectTrigger className="w-full" variant="filled">
                  <SelectValue placeholder="Selecione o outorgante" />
                </SelectTrigger>

                <SelectContent>
                  {clients &&
                    clients.map((item) => (
                      <SelectItem key={item.document} value={item.document}>
                        {item.firstName} {item.lastName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1">Outorgado</Label>
              <Select value={selectedAttorney} onValueChange={(value) => setSelectedAttorney(value)}>
                <SelectTrigger className="w-full" variant="filled">
                  <SelectValue placeholder="Selecione o advogado" />
                </SelectTrigger>

                <SelectContent>
                  {attorneys &&
                    attorneys.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.firstName} {item.lastName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : step == 1 ? (
          <div className="flex flex-col items-center justify-center gap-4  max-w-md mx-auto">
            <label className="flex flex-col items-center justify-center w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-gray-50 transition">
              <span className="text-gray-600 text-sm mb-2">Selecione um arquivo .docx</span>
              <input
                type="file"
                accept=".docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <span className="text-blue-600 font-medium">Clique para enviar</span>
            </label>

            <div className="text-sm ">{file?.name}</div>
          </div>
        ) : (
          <div className="flex justify-center item-center gap-2">
            <IoCheckmarkCircleSharp className="text-2xl text-gray-500" />

            <div className="text-center">Documento baixado</div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          variant={"outline"}
          onClick={() => setStep(step - 1)}
          disabled={step != 0 && selectedAttorney ? false : true}
        >
          Voltar
        </Button>

        <Button
          disabled={
            step == 0 ? (selectedAttorney && selectedClient ? false : true) : step == 1 ? (file ? false : true) : true
          }
          onClick={handleClick}
        >
          Avançar
        </Button>
      </div>
    </div>
  );
}

export default DocumentGeneratorCard;
