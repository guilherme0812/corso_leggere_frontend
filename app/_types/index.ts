export type DefaultResponseType = {
  message: string;
};
export type LoginDataType = {
  token: string;
  id: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  phone: any;
  hasWhatsapp: boolean;
  profilePicture: any;
  isActive: boolean;
  lastLoginAt: any;
  createAt: string;
  updateAt: string;
  companyId: string;
  company: CompanyDataType;
};

export interface CompanyDataType {
  id: string;
  name: string;
  cnpj: string;
  banner: any;
  countryId: any;
  stateId: any;
  cityId: any;
  address: any;
  phone1: any;
  phone2: any;
  hasWhatsapp1: boolean;
  hasWhatsapp2: boolean;
  email: any;
  website: any;
  registrationNumber: any;
  taxRegime: any;
  headquarters: boolean;
  isActive: boolean;
  createdBy: any;
  updatedBy: any;
  foundedAt: any;
  documentStorageUrl: any;
  lastLoginAt: any;
  createAt: string;
  updateAt: string;
}
