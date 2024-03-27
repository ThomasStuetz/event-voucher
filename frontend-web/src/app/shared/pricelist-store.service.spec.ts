import { TestBed } from '@angular/core/testing';

import { PricelistStoreService } from './pricelist-store.service';

describe('PricelistStoreService', () => {
  let service: PricelistStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricelistStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
