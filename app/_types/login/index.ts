export interface UserDataType {
  id: string;
  email: string;
  password: string;
  role: any;
  firstName: string;
  lastName: string;
  phone: string | null;
  hasWhatsapp: boolean;
  profilePicture: string | null;
  isActive: boolean;
  lastLoginAt: Date | null;
  createAt: Date;
  updateAt: Date;
  companyId: string | null;
  company: CompanyDataType;
}

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
