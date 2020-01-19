import {
  Component,
  OnInit
} from '@angular/core';
import {
  ItemService
} from '../service/menu-item.service';
import {
  CartService
} from '../service/cart.service';
import {
  Subject
} from 'rxjs';
import {
  takeUntil
} from 'rxjs/operators';
import {
  Item
} from '../model/menu-item';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class ItemComponent implements OnInit {

  items: Item[];

  private readonly destroy$ = new Subject();

  constructor(private itemService: ItemService, private cartService: CartService, private route: ActivatedRoute) {}

  addToCart(id): void {
    this.itemService.getItem(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.itemService.addToCart(res[0]);
        });
    document.getElementById("cart-panel").classList.add("active");
    setTimeout(function () {
      document.getElementById("cart-panel").classList.remove("active");

    }, 500);
  }

  getItems(type): void {
    this.itemService.getItems(type).
    pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.items = res;
        });
    if (document.getElementById("cart-panel")) {
      document.getElementById("cart-panel").classList.remove("active");

    }
    document.getElementById("pizzas-category").classList.remove("active");
    document.getElementById("pastas-category").classList.remove("active");
    document.getElementById("drinks-category").classList.remove("active");
    document.getElementById(type + "s-category").classList.add("active");

  }

  public href: string = "";
  ngOnInit() {
    this.route.params.subscribe(parameters => {
      this.getItems(parameters['type']);
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
