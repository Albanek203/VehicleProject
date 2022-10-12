import { Transporter } from "@api/models/Transporter";
import { ShortDelivery } from "@api/models/ShortDelivery";
import { OfferStatus } from "@api/models/enum/OfferStatus";

export interface Offer {
  id: number;
  status: OfferStatus;
  description: string;
  delivery: ShortDelivery;
  transporter: Transporter;
}
