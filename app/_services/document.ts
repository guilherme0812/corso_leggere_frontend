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

export const generateDocumentBodyType: GenerateDocumentBodyType = {
  grantor: {
    document: "document",
    officialId: "officialId",
    officialIdIssuingBody: "officialIdIssuingBody",
    officialIdissuingState: "officialIdissuingState",
    phone: "phone",
    email: "email",
    addressStreet: "addressStreet",
    addressNumber: "addressNumber",
    addressComplement: "addressComplement",
    addressZipCode: "addressZipCode",
    zone: "zone",
    birthDate: "birthDate",
    nacionality: "nacionality",
    maritalStatus: "maritalStatus",
    profession: "profession",
    stateId: "stateId",
    countryId: "countryId",
    name: "name",
    city: "city",
  },
  grantee: {
    name: "name",
    licenceNumber: "licenceNumber",
    licenceJurisdiction: "licenceJurisdiction",
    licenceCountryCode: "licenceCountryCode",
    phone: "phone",
    email: "email",
    nationality: "nationality",
    maritalStatus: "maritalStatus",
    professionalAddress: "professionalAddress",
  },
};
