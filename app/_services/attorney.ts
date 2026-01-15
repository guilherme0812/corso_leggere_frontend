import { getPrefix } from ".";
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

export const getAttorneys = async ({ name }: { name?: string | null }, _prefix?: string) => {
  try {
    const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<IAttorney[]>({
      url: `${prefix}/attorney`,
      method: "GET",
      params: { name },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const getAttorneysClientSide = async ({ name }: { name?: string | null }) => {
  try {
    const res = await apiLeggere<IAttorney[]>({
      url: `/attorney`,
      method: "GET",
      params: { name },
    });

    const { data } = res;

    console.log("data", data);

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("error");
  }
};
