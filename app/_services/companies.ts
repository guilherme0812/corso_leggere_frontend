import { getPrefix } from ".";
import { apiServerLeggere } from "./api";

export type ICompany = {
  id: string;
  name: string;
  cnpj: string;
  banner: string;
  countryId: string;
  stateId: string;
  cityId: string;
  address: string;
  phone1: string;
  phone2: any;
  hasWhatsapp1: boolean;
  hasWhatsapp2: boolean;
  email: string;
  website: string;
  registrationNumber: string;
  taxRegime: string;
  headquarters: boolean;
  isActive: boolean;
  createdBy: any;
  updatedBy: any;
  foundedAt: any;
  documentStorageUrl: string;
  lastLoginAt: any;
  createAt: string;
  updateAt: string;
};

export const getCompanies = async ({}: { name?: string | null }, _prefix?: string) => {
  try {
    const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<ICompany[]>({
      url: `${prefix}/companies`,
      method: "GET",
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
