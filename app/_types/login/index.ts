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
}
