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

export type ReceivedByCaseDataType = {
  caseId: string;
  total: number;
  caseName: string;
  processNumber: string;
};

export const getAttorneyReceivedByCaseClientSide = async ({ attorneyId }: { attorneyId: string }) => {
  try {
    const res = await apiLeggere<ReceivedByCaseDataType[]>({
      url: `/financial/attorney-received-by-case`,
      method: "GET",
      params: { attorneyId },
    });

    const { data } = res;

    console.log("data", data);

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("error");
  }
};

export const getAttorneyTotalReceivedClientSide = async ({ attorneyId }: { attorneyId: string }) => {
  try {
    const res = await apiLeggere<{ amount: number }>({
      url: `/financial/attorney-total-received`,
      method: "GET",
      params: { attorneyId },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("error");
  }
};

export type AttorneyPendingPaymentDataType = {
  status: any;
  id: string;
  paymentId: string;
  beneficiaryId: string;
  type: string;
  percentage: number;
  fixedAmount: number;
  calculatedAmount: number;
  dueDate: string;
  isPaid: boolean;
  paidAt: any;
  paidAmount: number;
  caseId: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  payment: Payment;
};

export interface Payment {
  id: string;
  code: string;
  description: any;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  issueDate: string;
  dueDate: string;
  status: string;
  caseId: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  case: Case;
}

export interface Case {
  id: string;
  processNumber: string;
  title: string;
  status: string;
  estimatedValue: number;
  clientId: string;
  companyId: string;
  attorneyId: any;
  createdAt: string;
  updatedAt: string;
  closedAt: any;
  client: Client;
}

export interface Client {
  document: string;
  officialId: string;
  officialIdIssuingBody: string;
  officialIdissuingState: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  hasWhatsapp: boolean;
  addressStreet: string;
  addressNumber: string;
  addressComplement: string;
  addressZipCode: string;
  zone: string;
  birthDate: any;
  notes: any;
  nacionality: string;
  maritalStatus: string;
  profession: string;
  cityId: string;
  stateId: string;
  countryId: string;
  companyId: string;
}

export const getAttorneyPendingPaymentsClientSide = async ({ attorneyId }: { attorneyId: string }) => {
  try {
    const res = await apiLeggere<AttorneyPendingPaymentDataType[]>({
      url: `/financial/attorney-pending-peyments`,
      method: "GET",
      params: { attorneyId },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("error");
  }
};
