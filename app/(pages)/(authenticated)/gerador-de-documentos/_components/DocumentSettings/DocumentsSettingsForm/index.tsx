import { Input } from "@/app/_components/ui/Input";
import { enqueueSnackbar } from "notistack";
import { useMemo } from "react";
import { LuCopy } from "react-icons/lu";

type DocumentsSettingsFormType = {
  data: Record<string, any>;
  node: string;
};

function DocumentsSettingsForm({ node, data }: DocumentsSettingsFormType) {
  const formData = useMemo(() => {
    return Object.entries(data);
  }, [data]);

  const translate = (key: string) => {
    const t: any = {
      grantor: {
        document: "CPF",
        officialId: "RG",
        officialIdIssuingBody: "órgão emissor",
        officialIdissuingState: "Estado de emissão",
        phone: "Telefone",
        email: "Email",
        addressStreet: "Endereço",
        addressNumber: "Número",
        addressComplement: "Complemento",
        addressZipCode: "CEP",
        zone: "Bairro",
        birthDate: "Data de nascimento",
        nacionality: "Nacionalidade",
        maritalStatus: "Estado civil",
        profession: "Profissão",
        stateId: "Estado",
        countryId: "Pais",
        name: "Nome",
        city: "Cidade",
      },
      grantee: {
        name: "Nome",
        licenceNumber: "OAB",
        licenceJurisdiction: "Estado de jurisdição",
        licenceCountryCode: "País",
        phone: "Telefone",
        email: "Email",
        nationality: "Nacionalidade",
        maritalStatus: "Estado civil",
        professionalAddress: "Endereço profissional",
      },
    } as any;

    return t[node][key] || "";
  };

  return (
    <div className=" flex flex-col gap-2">
      {formData?.map((item, key) => (
        <div className="grid grid-cols-12 gap-2" key={key}>
          <div className="col-span-5">
            <div className="text-sm">{translate(item[0])}</div>
          </div>
          <div className="col-span-6">
            <Input variant="filled" value={`${node}.${item[1]}`} disabled />
          </div>
          <div className="col-span-1 flex items-center justify-end">
            <div
              role="button"
              onClick={() => {
                navigator.clipboard.writeText(`[[${node}.${item[1]}]]`);
                enqueueSnackbar("Copiado com sucesso!", { variant: "success" });
              }}
            >
              <LuCopy />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DocumentsSettingsForm;
