import {
  Injectable
} from '@angular/core';
import {
  ItemService
} from './menu-item.service';
import {
  HttpClient
} from '@angular/common/http';

import {
  FormGroup
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  removeItemFromCart(id) {
    for (var i = 0; i < ItemService.itemsInCart.length; i++) {
      if (ItemService.itemsInCart[i].id == id) {
        ItemService.itemsInCart.splice(i, 1);
        break;
      };
    }
  }

  saveOrder(order: FormGroup): void {
    this.http.post('http://localhost:3000/orders', order.value).subscribe();
  }

  constructor(private http: HttpClient) {}
}
