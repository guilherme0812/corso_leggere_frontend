import { apiLeggere, apiServerLeggere } from "./api";

export type IAttorney = {
  id: string;
  firstName: string;
  lastName: string;
  licenceNumber: string;
  licenceJurisdiction: string;
  licenceCountryCode: string;
  phone: string;
  email: string;
  nationality: string;
  maritalStatus: string;
  professionalAddress: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
};

export const deleteClient = async (document: string) => {
  try {
    apiLeggere({
      method: "delete",
      url: `/client`,
      params: { document },
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const getAttorneys = async ({ name }: { name?: string | null }) => {
  try {
    const res = await apiServerLeggere<IAttorney[]>({
      url: "/attorney",
      method: "GET",
      params: { name },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
