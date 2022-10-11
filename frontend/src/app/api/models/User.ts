import { Role } from "@api/models/enum/Role";

export interface User {
  id: number;
  email: string;
  role: Role;
  name: string;
  surname: string;
  active: Boolean;
}
