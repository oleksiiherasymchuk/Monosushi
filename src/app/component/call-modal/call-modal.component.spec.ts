import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { CallModalComponent } from './call-modal.component';

describe('CallModalComponent', () => {
  let component: CallModalComponent;
  let fixture: ComponentFixture<CallModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallModalComponent ],
      imports: [
        HttpClientTestingModule,
        // RouterTestingModule,
        // ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        // { provide: Auth, useValue: {} },
        // { provide: Firestore, useValue: {} },
        // { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
