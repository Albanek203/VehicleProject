import { Cargo } from "@api/models/Cargo";
import { Customer } from "@api/models/Customer";
import { Offer } from "@api/models/Offer";

export interface Delivery {
  id: number;
  price: number;
  unit: string;
  country_from: string;
  city_from: string;
  street_from: string;
  country_to: string;
  city_to: string;
  street_to: string;
  createdDate: string;
  departureDate: string;
  arrivalDate: string;
  status: string;
  description: string;
  cargos: Cargo[];
  customer: Customer;
  offers: Offer[];
}
