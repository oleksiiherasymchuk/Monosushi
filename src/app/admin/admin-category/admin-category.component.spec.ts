import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AdminCategoryComponent } from './admin-category.component';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoryComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
