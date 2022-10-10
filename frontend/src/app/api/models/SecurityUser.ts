import { Role } from "@api/models/enum/Role";

export interface SecurityUser {
  id: number;
  email: string;
  role: Role;
  name: string;
  surname: string;
}
