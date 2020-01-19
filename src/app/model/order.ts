import {
  Item
} from './menu-item';

export class Order {
  id: number;
  fullName: string;
  address: string;
  phoneNumber: string;
  itemsList: Item[];
  totalCost: number;
}
