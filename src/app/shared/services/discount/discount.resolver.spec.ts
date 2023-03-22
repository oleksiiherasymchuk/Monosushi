import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DiscountResolver } from './discount.resolver';

describe('DiscountResolver', () => {
  let resolver: DiscountResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    resolver = TestBed.inject(DiscountResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
