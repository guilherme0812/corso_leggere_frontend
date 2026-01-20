import { apiLeggere } from "./api";

export enum BeneficiaryTypeEnum {
  ATTORNEY = "ATTORNEY", // Advogado
  REFERRAL = "REFERRAL", // Indicação
  PARTNER = "PARTNER", // Parceiro
  OFFICE = "OFFICE", // Próprio escritório
  SUPPLIER = "SUPPLIER", // Fornecedor
  OTHER = "OTHER",
}

export type BeneficiaryDataType = {
  id: string;
  type: BeneficiaryTypeEnum;
  name: string;
  document: string;
  email: string;
  phone: string;
  bankName: any;
  bankCode: any;
  accountNumber: any;
  accountType: any;
  pixKey: any;
  attorneyId: string;
  notes: any;
  isActive: boolean;
  companyId: string;
};

export const getBeneficiariesClientSide = async ({ name }: { name?: string | null }) => {
  try {
    const res = await apiLeggere<BeneficiaryDataType[]>({
      url: `/financial/beneficiaries`,
      method: "GET",
      params: { name },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("error");
  }
};

export const createBeneficiatyClientSide = async (body: Omit<BeneficiaryDataType, "id" | "companyId" | "isActive">) => {
  try {
    const res = await apiLeggere<any>({
      url: `/financial/beneficiary`,
      method: "POST",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("error");
  }
};

export const updateBeneficiatyClientSide = async (body: BeneficiaryDataType) => {
  try {
    const res = await apiLeggere<any>({
      url: `/financial/beneficiary`,
      method: "PUT",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("error");
  }
};

export const deleteBeneficiatyClientSide = async (id: string) => {
  try {
    const res = await apiLeggere<any>({
      url: `/financial/beneficiary`,
      method: "DELETE",
      params: {
        id,
      },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("error");
  }
};
