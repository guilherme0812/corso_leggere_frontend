import { getPrefix } from ".";
import { apiLeggere, apiServerLeggere } from "./api";

export type IClient = {
  document: string;
  officialId: string | null;
  officialIdIssuingBody: string | null;
  officialIdissuingState: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  hasWhatsapp: boolean;
  addressStreet: string | null;
  addressNumber: string | null;
  addressComplement: string | null;
  addressZipCode: string | null;
  zone: string | null;
  cityId: string;
  stateId: string;
  countryId: string;
  birthDate: string;
  notes: string;
  companyId: string;
  maritalStatus: string | null;
  profession: string | null;
  nacionality: string | null;
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

export const getClients = async ({ name }: { name?: string | null }, _prefix?: string) => {
  try {
    const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<IClient[]>({
      url: `${prefix}/clients`,
      method: "GET",
      params: { name },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
