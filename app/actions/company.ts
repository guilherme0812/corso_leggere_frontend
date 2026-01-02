"use server";

import { apiServerLeggere } from "../_services/api";
import { ICompany } from "../_services/companies";

export const updateCompany = async (formData: FormData) => {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  data.hasWhatsapp1 = data.hasWhatsapp1 == "true";
  data.hasWhatsapp2 = data.hasWhatsapp2 == "true";
  data.headquarters = data.headquarters == "true";
  data.isActive = data.isActive == "true";

  try {
    const res = await apiServerLeggere<ICompany>({
      url: "/company",
      method: "PUT",
      data,
      params: {
        id: data.id,
      },
    });

    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};
