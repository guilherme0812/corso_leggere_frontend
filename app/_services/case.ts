import { apiServerLeggere } from "./api";

export enum CaseStatus {
  PENDING = "PENDING",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export type ICase = {
  id: string
  title: string
  lawyerId: string
  indicatorId: null;
  businessFee: number;
  lawyerFee: number;
  indicatorFee: null;
  status: CaseStatus;
  createdAt: string
  clientId: string
  companyId: string
  processNumber?: string;
};

export const getCases = async () => {
  try {
    const res = await apiServerLeggere<ICase[]>({
      url: "/cases",
      method: "GET",
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
