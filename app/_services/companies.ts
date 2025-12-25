import { getPrefix } from ".";
import { apiLeggere, apiServerLeggere } from "./api";

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

export type CompanyBody = Omit<
  ICompany,
  "id" | "createAt" | "updateAt" | "createdBy" | "lastLoginAt" | "updatedBy" | "foundedAt"
>;

export const getCompanies = async ({ name }: { name?: string | null }, _prefix?: string) => {
  try {
    const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<ICompany[]>({
      url: `${prefix}/admin/companies`,
      method: "GET",
      params: { name },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const getCompaniesClientSide = async ({}: { name?: string | null }, _prefix?: string) => {
  try {
    const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiLeggere<ICompany[]>({
      url: `${prefix}/admin/companies`,
      method: "GET",
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const CreateCompanyClientSide = async ({ body, _prefix }: { body: CompanyBody; _prefix?: string }) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiLeggere<any>({
      url: `${_prefix || ""}/company`,
      method: "POST",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const updateCompanyClientSide = async ({ body, _prefix }: { body: CompanyBody; _prefix?: string }) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiLeggere<any>({
      url: `${_prefix || ""}/company`,
      method: "PUT",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteCompanyClientSide = async ({ id, _prefix }: { id: string; _prefix?: string }) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiLeggere<any>({
      url: `${_prefix || ""}/company`,
      method: "DELETE",
      params: { id: id },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
