import { Button } from "@/app/_components/ui/Button";
import { Input } from "@/app/_components/ui/Input";
import { GenerateDocumentBodyType } from "@/app/_services/customDocumentMapping";
import { enqueueSnackbar } from "notistack";
import { Dispatch, SetStateAction, useMemo } from "react";
import { LuCopy } from "react-icons/lu";
import { MdSave } from "react-icons/md";

type DocumentsSettingsFormType = {
  node: string;
  mappingJson: GenerateDocumentBodyType;
  setMappingJson: Dispatch<SetStateAction<GenerateDocumentBodyType>>;
  handleSave: () => Promise<void>;
  modified: boolean;
};

function DocumentsSettingsForm({ node, mappingJson, setMappingJson, handleSave, modified }: DocumentsSettingsFormType) {
  const formData = useMemo(() => {
    return Object.entries((mappingJson as any)[node]);
  }, [mappingJson, node]);

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

  const setFieldValue = (key: string, value: string) => {
    if (!value) {
      return;
    }

    const newValue = mappingJson as any;

    newValue[node][key] = value;

    setMappingJson(() => ({ ...newValue }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-4">
        <Button size={"sm"} onClick={handleSave} disabled={!modified}>
          <MdSave />
          Salvar alterações
        </Button>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin h-full pt-4">
        {formData?.map((item, key) => (
          <div className="grid grid-cols-12 gap-2" key={key}>
            <div className="col-span-5">
              <div className="text-sm">{translate(item[0])}</div>
            </div>
            <div className="col-span-6">
              <Input variant="filled" value={`${item[1]}`} onChange={(e) => setFieldValue(item[0], e.target.value)} />
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
    </div>
  );
}

export default DocumentsSettingsForm;
