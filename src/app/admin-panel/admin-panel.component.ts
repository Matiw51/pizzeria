import { OrderService } from '../service/order.service';
import { Component, OnInit } from '@angular/core';
import {ItemService} from '../service/menu-item.service';
import {CartService} from '../service/cart.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Item} from '../model/menu-item';
import {Order} from '../model/order';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  items: Item[];
  orders: Order[];
  
  item: Item;
  private readonly destroy$ = new Subject();

  constructor(private itemService:ItemService,private orderService:OrderService, private router: Router) { }



  getItems(): void{
    this.itemService.getAllItems().
    pipe(takeUntil(this.destroy$))
    .subscribe(
      res => {
        this.items = res;
      });   
      document.getElementById("orders-category").classList.remove("active");
      document.getElementById("items-category").classList.add("active");   
  }
  
  getOrders(): void{
    this.orderService.getOrders()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      res => {
        this.orders = res;
      });   
      document.getElementById("orders-category").classList.add("active");
      document.getElementById("items-category").classList.remove("active");   
  }

  ngOnInit() {
    if(this.router.url==="/admin/items"){
      this.getItems();
    }else if(this.router.url==="/admin/orders"){
      this.getOrders();
    }
  }

}
