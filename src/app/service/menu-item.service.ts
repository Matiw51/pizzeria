import {
  Injectable
} from '@angular/core';
import {
  Item
} from '../model/menu-item';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  static itemsInCart: Item[];

  getItems(type: string): Observable < Item[] > {
    return this.http.get < Item[] > ('http://localhost:3000/items?type=' + type);
  }

  getAllItems(): Observable < Item[] > {
    return this.http.get < Item[] > ('http://localhost:3000/items');
  }

  getItem(id: number): Observable < Item[] > {
    return this.http.get < Item[] > ('http://localhost:3000/items?id=' + id);
  }

  addToCart(item: Item) {
    if (ItemService.itemsInCart == null) {
      ItemService.itemsInCart = [];
    }
    ItemService.itemsInCart.push(item);
  }


  updateItem(item: Item): void {
    this.http.put('http://localhost:3000/items/' + item.id, item).subscribe();
  }

  constructor(private http: HttpClient) {}
}
