import {
  TestBed,
  inject
} from '@angular/core/testing';

import {
  OrderService
} from './order.service';

describe('OrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService]
    });
  });

});
