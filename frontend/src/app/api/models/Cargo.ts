import { ShortDelivery } from "@api/models/ShortDelivery";

export interface Cargo {
  id: number;
  count: number;
  name: string;
  unit: string;
  totalWeight: number;
  totalVolume: number;
  isFragile: boolean;
  delivery: ShortDelivery;
}
