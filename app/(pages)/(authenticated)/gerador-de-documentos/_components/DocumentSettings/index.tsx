import { useEffect, useMemo, useState } from "react";
import DocumentsSettingsForm from "./DocumentsSettingsForm";
import { ICustomDocumentMapping } from "@/app/_services/customDocumentMapping";
import { updateCustomDocumentMapping } from "@/app/actions/customDocumentMapping";
import { enqueueSnackbar } from "notistack";
import cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/navigation";
import clsx from "clsx";

function DocumentSettings({ customDocumentMapping }: { customDocumentMapping: ICustomDocumentMapping }) {
  const [selectedTab, setSelectedTab] = useState<string>();
  const [mappingJson, setMappingJson] = useState(cloneDeep(customDocumentMapping?.customMappingJson));

  const router = useRouter();
  const modified = useMemo(() => {
    return JSON.stringify(customDocumentMapping?.customMappingJson) != JSON.stringify(mappingJson);
  }, [customDocumentMapping, mappingJson]);

  const tranlateName = (node: string): string => {
    const t = {
      grantor: "Outorgante",
      grantee: "Outorgado",
    } as any;

    return t[node];
  };

  const handleSave = async () => {
    const body = {
      ...customDocumentMapping,
      customMappingJson: JSON.stringify(mappingJson),
    };

    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    try {
      await updateCustomDocumentMapping(formData);

      enqueueSnackbar("Alterado com sucesso!", { variant: "success" });

      router.push("/gerador-de-documentos");
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const tab = Object.entries(mappingJson)[0][0];

    setSelectedTab(() => tab);
  }, []);

  return (
    <div className="w-full h-[80svh] grid grid-cols-12">
      <div className="col-span-3 flex flex-col gap-4">
        {selectedTab &&
          Object.entries(mappingJson)?.map((item, index) => (
            <>
              <div
                key={index}
                className={clsx(
                  `w-full px-2 py-1 border-l-4 border-transparent border-solid text-sm hover:cursor-pointer hover:border-slate-500  transition-all duration-300`,
                  selectedTab == item[0] ? "border-slate-800" : ""
                )}
                onClick={() => setSelectedTab(item[0])}
              >
               {tranlateName(item[0])}
              </div>
            </>
          ))}
      </div>

      <div className="col-span-6 bg-background p-4 rounded-md shadow-custom overflow-y-auto">
        {selectedTab && (
          <DocumentsSettingsForm node={selectedTab} {...{ mappingJson, setMappingJson, handleSave, modified }} />
        )}
      </div>
    </div>
  );
}

export default DocumentSettings;
