import {
  Component,
  OnInit
} from '@angular/core';
import {
  CartService
} from '../service/cart.service'
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
  ItemService
} from '../service/menu-item.service';
import {
  FormControl, FormGroup, ValidatorFn, AbstractControl
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Item[];
  cost: string;

  constructor(private cartService: CartService, private router:Router) {}
  private readonly destroy$ = new Subject();


  orderForm = new FormGroup({
    id: new FormControl(''),
    fullName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]) ,
    phoneNumber: new FormControl('', [Validators.required, forbiddenNumber()]),
    totalCost: new FormControl(''),
    items: new FormControl('')
  });

  
  onSubmit(){
    this.orderForm.patchValue({'totalCost': this.cost});
    this.orderForm.patchValue({'items': this.items});
    this.cartService.saveOrder(this.orderForm);
    this.router.navigate(['/orderconfirmation']);
  }

  getCart(): void {
    this.items = ItemService.itemsInCart;
    this.calculateTotalCost();
    document.getElementById("cart-panel").classList.add("active");
  }

  calculateTotalCost() {
    let cost: number = 0;
    if (ItemService.itemsInCart != undefined) {
      this.items.forEach(item => {
        cost = cost + +item.price;
      });
      this.cost = Number(cost).toFixed(2);
    } else {
      this.cost = Number(0.00).toFixed(2);
    }
  }

  removeItemFromCart(id): void {
    this.cartService.removeItemFromCart(id);
    this.calculateTotalCost();
  }

  ngOnInit() {
    this.getCart();
  }

}

export function forbiddenNumber(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return !control.value.match('^[0-9]*$') ?
       {'forbiddenNumber': 'Wrong number' } : null;
  };
}