"use server";

import { changeCustomDocumentMappingByCompany, ICustomDocumentMapping } from "../_services/customDocumentMapping";

export const updateCustomDocumentMapping = async (formData: FormData) => {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  data.customMappingJson = JSON.parse(data.customMappingJson);

  console.log(data);

  const result = await changeCustomDocumentMappingByCompany(data as ICustomDocumentMapping);

  return result;
};
