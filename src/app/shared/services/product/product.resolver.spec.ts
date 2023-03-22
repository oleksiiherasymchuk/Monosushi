import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductResolver } from './product.resolver';

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
     
    });
    resolver = TestBed.inject(ProductResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
