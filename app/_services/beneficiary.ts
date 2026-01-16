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
