import { apiLeggere, apiServerLeggere } from "./api";

export type IClient = {
  document: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  hasWhatsapp: boolean;
  address: string;
  cityId: string;
  stateId: string;
  countryId: string;
  birthDate: string;
  notes: string;
  companyId: string;
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

export const getClients = async ({ name }: { name?: string | null }) => {
  try {
    const res = await apiServerLeggere<IClient[]>({
      url: "/clients",
      method: "GET",
      params: { name },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
