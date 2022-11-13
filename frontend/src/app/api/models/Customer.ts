import { Delivery } from "@api/models/Delivery";

export interface Customer {
  id: number;
  name: string;
  phone: string;
  deliveries: Delivery[];
}
