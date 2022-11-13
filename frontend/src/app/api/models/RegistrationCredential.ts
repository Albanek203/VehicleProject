import { Role } from "@api/models/enum/Role";

export interface RegistrationCredential {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: Role;
}
