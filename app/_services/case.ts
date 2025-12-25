import { apiLeggere, apiServerLeggere } from "./api";

export enum CaseStatus {
  PENDING = "PENDING",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export type ICase = {
  id: string;
  title: string;
  lawyerId: string;
  indicatorId: null;
  businessFee: number;
  lawyerFee: number;
  indicatorFee: null;
  status: CaseStatus;
  createdAt: string;
  closedAt?:string
  clientId: string;
  companyId: string;
  processNumber?: string;
  client?: {
    document: string;
    firstName: string;
    lastName: string;
  };
};

type GetCasesDTO = {
  processNumber?: string | undefined;
  title?: string | undefined;
  clientName?: string | undefined;
};

export const getCases = async (params: GetCasesDTO) => {
  try {
    const res = await apiServerLeggere<ICase[]>({
      url: "/cases",
      method: "GET",
      params,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const getCasesClientSide = async () => {
  try {
    const res = await apiLeggere<ICase[]>({
      url: "/cases",
      method: "GET",
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
