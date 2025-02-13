import { Customer } from './customer.model';
import { Pack } from './pack.model';

export interface Subscription {
  id?: number;
  customer: Customer;
  pack: Pack;
  startDate: string;
  activeSubscription: boolean;
}
