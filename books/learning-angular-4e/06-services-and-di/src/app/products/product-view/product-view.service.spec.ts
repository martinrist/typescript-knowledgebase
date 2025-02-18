import { TestBed } from '@angular/core/testing';

import { ProductViewService } from './product-view.service';

describe('ProductViweService', () => {
  let service: ProductViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
