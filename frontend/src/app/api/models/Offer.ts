import { Transporter } from "@api/models/Transporter";

export interface Offer {
  id: number;
  description: string;
  transporter: Transporter;
}
