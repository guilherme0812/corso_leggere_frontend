import { apiServerLeggere } from "./api";

export enum CaseStatus {
  PENDING = "PENDING",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export type ICase = {
  id: string;
  caseNumber: string;
  description: string;
  status: CaseStatus;
  openedAt: string;
  closedAt: string;
  clientId: string;
  companyId: string;
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
