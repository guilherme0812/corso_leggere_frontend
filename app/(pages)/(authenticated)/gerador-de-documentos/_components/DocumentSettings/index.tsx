import { useEffect, useMemo, useState } from "react";
import DocumentsSettingsForm from "./DocumentsSettingsForm";
import { generateDocumentBodyType } from "@/app/_services/document";

const json = generateDocumentBodyType;

function DocumentSettings() {
  const [selectedTab, setSelectedTab] = useState<[string, any]>();

  const data = useMemo(() => {
    return Object.entries(json);
  }, [json]);

  const tranlateName = (node: string): string => {
    const t = {
      grantor: "Outorgante",
      grantee: "Outorgado",
    } as any;

    return t[node];
  };

  useEffect(() => {
    if (data) {
      setSelectedTab(data[0]);
    }
  }, [data]);

  selectedTab && console.log(JSON.stringify(json), selectedTab[0]);

  return (
    <div className="w-full min-h-[80svh] grid grid-cols-12">
      <div className="col-span-3 flex flex-col gap-4">
        {selectedTab &&
          data?.map((item, index) => (
            <>
              <div
                key={index}
                className={`w-full px-2 py-1 border-l-4 border-transparent border-solid text-sm hover:cursor-pointer hover:border-slate-500 ${
                  selectedTab[0] == item[0] ? "border-slate-950" : ""
                }  transition-all duration-300 `}
                onClick={() => setSelectedTab(item)}
              >
                {tranlateName(item[0])}
              </div>
            </>
          ))}
      </div>
      <div className="col-span-6 h-full bg-background p-4 rounded-md shadow-xl overflow-y-auto">
        {selectedTab && <DocumentsSettingsForm node={selectedTab[0]} data={selectedTab[1]} />}
      </div>
    </div>
  );
}

export default DocumentSettings;
