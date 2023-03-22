import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductInfoComponent } from './product-info.component';

xdescribe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInfoComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        // ReactiveFormsModule,
        // MatDialogModule
      ],
      providers: [
        // { provide: MatDialogRef, useValue: {} },
        // { provide: Auth, useValue: {} },
        // { provide: Firestore, useValue: {} },
        // { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
