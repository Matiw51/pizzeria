import {
  Component,
  OnInit
} from '@angular/core';
import {
  Item
} from '../model/menu-item';
import {
  ItemService
} from '../service/menu-item.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  takeUntil
} from 'rxjs/operators';
import {
  Subject
} from 'rxjs';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  item: Item;

  private readonly destroy$ = new Subject();

  constructor(private itemService: ItemService, private route: ActivatedRoute) {}
  setUnavailable() {
    this.item.available = false;
    this.itemService.updateItem(this.item);
  }

  setAvailable() {
    this.item.available = true;
    this.itemService.updateItem(this.item);
  }
  ngOnInit() {
    this.route.params.subscribe(parameters => {
      this.itemService.getItem(parameters['id'])
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          res => {
            this.item = res[0];
          });
    });
  }
}
