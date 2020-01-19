import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Order
} from '../model/order';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  getOrders(): Observable < Order[] > {
    return this.http.get < Order[] > ('http://localhost:3000/orders');
  }

  getOrder(id: number): Observable < Order[] > {
    return this.http.get < Order[] > ('http://localhost:3000/orders?id=' + id);
  }

  constructor(private http: HttpClient) {}
}
