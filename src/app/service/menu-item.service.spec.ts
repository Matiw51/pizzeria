import {
  TestBed,
  inject
} from '@angular/core/testing';
import {
  Item
} from '../model/menu-item';
import {
  ItemService
} from './menu-item.service';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('ItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemService],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should return all items list', inject([HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      //calling the Service
      service.getAllItems().subscribe(res => {
        expect(res.length).toBe(2);
        expect(res[0].name).toBe("DummyPizza1");
        expect(res[1].ingredients).toBe("DummyIngredients2");
      });
      //setting the expectations for the mock
      const req = httpMock.expectOne('http://localhost:3000/items');
      expect(req.request.method).toEqual('GET');
      //setting fake data
      req.flush([{
          "id": 1,
          "name": "DummyPizza1",
          "ingredients": "DumyIngredients1",
          "type": "pizza",
          "price": "18.00",
          "available": false
        },
        {
          "id": 2,
          "name": "DummyPizza2",
          "ingredients": "DummyIngredients2",
          "type": "pizza",
          "price": "23.50",
          "available": true
        }
      ]);
    }));

  it('should return item of given id', inject([HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      //calling the Service
      service.getItem(1).subscribe(res => {
        expect(res[0].name).toBe("DummyPizza1");
      });
      //setting the expectations for the mock
      const req = httpMock.expectOne('http://localhost:3000/items?id=1');
      expect(req.request.method).toEqual('GET');
      //setting fake data to be returned from database
      req.flush([{
        "id": 1,
        "name": "DummyPizza1",
        "ingredients": "DumyIngredients1",
        "type": "pizza",
        "price": "18.00",
        "available": false
      }]);
    }));

  it('should return items of type pizza', inject([HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      //calling the Service
      service.getItems("pizza").subscribe(res => {
        expect(res[0].name).toBe("DummyPizza1");
        expect(res[1].ingredients).toBe("DummyIngredients2");
      });
      //setting the expectations for the mock
      const req = httpMock.expectOne('http://localhost:3000/items?type=pizza');
      expect(req.request.method).toEqual('GET');
      //setting fake data to be returned from database
      req.flush([{
          "id": 1,
          "name": "DummyPizza1",
          "ingredients": "DumyIngredients1",
          "type": "pizza",
          "price": "18.00",
          "available": false
        },
        {
          "id": 2,
          "name": "DummyPizza2",
          "ingredients": "DummyIngredients2",
          "type": "pizza",
          "price": "23.50",
          "available": true
        }
      ]);
    }));

  it('should add to cart', inject([ItemService], (service: ItemService) => {
    //given
    let item: Item = {
      "id": 2,
      "name": "DummyPizza2",
      "ingredients": "DummyIngredients2",
      "type": "pizza",
      "price": 23.50,
      "available": true
    }
    //when
    service.addToCart(item);
    //then
    expect(ItemService.itemsInCart[0]).toBe(item);
  }));


});
