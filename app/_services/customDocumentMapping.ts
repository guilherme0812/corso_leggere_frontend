import { apiServerLeggere } from "./api";

export type GenerateDocumentBodyType = {
  grantor: {
    document: string | null;
    officialId: string | null;
    officialIdIssuingBody: string | null;
    officialIdissuingState: string | null;
    phone: string | null;
    email: string | null;
    addressStreet: string | null;
    addressNumber: string | null;
    addressComplement: string | null;
    addressZipCode: string | null;
    zone: string | null;
    birthDate: string | null;
    nacionality: string | null;
    maritalStatus: string | null;
    profession: string | null;
    stateId: string | null;
    countryId: string | null;
    name: string | null;
    city: string | null;
  };
  grantee: {
    licenceNumber: string | null;
    licenceJurisdiction: string | null;
    licenceCountryCode: string | null;
    phone: string | null;
    email: string | null;
    nationality: string | null;
    maritalStatus: string | null;
    professionalAddress: string | null;
    name: string | null;
  };
};

export type ReplacePlaceholdersBody = {
  base_json: Record<string, any>;
  mapping_json: Record<string, any>;
};

export type ICustomDocumentMapping = {
  id: string;
  companyId: string;
  customMappingJson: GenerateDocumentBodyType;
  createdAt: string;
  updatedAt: string;
};

export const getCustomDocumentMappingByCompany = async ({ companyId }: { companyId: string }) => {
  try {
    const res = await apiServerLeggere<ICustomDocumentMapping>({
      url: "/company/customDocumentMapping",
      method: "GET",
      params: { companyId },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const changeCustomDocumentMappingByCompany = async (body: ICustomDocumentMapping) => {
  try {
    const res = await apiServerLeggere<ICustomDocumentMapping>({
      url: "/customDocumentMapping",
      method: "PUT",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
