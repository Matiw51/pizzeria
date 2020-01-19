import {
  Component,
  OnInit
} from '@angular/core';
import {
  OrderService
} from '../service/order.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Subject
} from 'rxjs';
import {
  takeUntil
} from 'rxjs/operators';
import {
  Order
} from '../model/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}
  order: Order;

  private readonly destroy$ = new Subject();
  ngOnInit() {
    this.route.params.subscribe(parameters => {
      this.orderService.getOrder(parameters['id'])
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          res => {
            this.order = res[0];
          });
    });

  }
}
