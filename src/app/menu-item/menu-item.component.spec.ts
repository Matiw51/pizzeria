import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import {
  ItemComponent
} from './menu-item.component';
import {
  ItemService
} from '../service/menu-item.service'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  ActivatedRoute,
  Data
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import { of
} from 'rxjs';
import {
  doesNotThrow
} from 'assert';

class MockItemService {
  getItem() {
    return of({
      "id": 2,
      "name": "DummyPizza2",
      "ingredients": "DummyIngredients2",
      "type": "pizza",
      "price": 23.50,
      "available": true
    })
  }
  addToCart() {}

}

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture < ItemComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [ItemComponent],
        providers: [{
          provide: ItemService,
          useClass: MockItemService
        }, {
          provide: ActivatedRoute,
          useValue: {
            params: of ({
              type: "pizza"
            })
          },
        }],
        imports: [HttpClientTestingModule]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.clock().install();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should highlight cart-panel on adding to cart', inject([HttpTestingController], () => {
    let container = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(container);
    component.addToCart(1);
    expect(container.classList.contains("active")).toBeTruthy;
    jasmine.clock().tick(1000);
    expect(container.classList.contains("active")).toBeFalsy;
  }));

});
