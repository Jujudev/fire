import { Company } from 'src/app/models/company.model';

export interface Roles { 
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
  company?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
  firstname: string;
  lastname: string;
  phone: string;
  photoURL: string;
  profession?: string;
  address?: string;
  introduction?: string;
}


