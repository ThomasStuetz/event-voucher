import {Product} from "./product";
import {Event} from "./event";

export interface Pricelist {
  event: Event
  product: Product
  price: number
}
