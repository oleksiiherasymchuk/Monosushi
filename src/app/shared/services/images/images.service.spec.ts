import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { TestBed } from '@angular/core/testing';

import { ImagesService } from './images.service';
import { Storage } from '@angular/fire/storage';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      AngularFireStorageModule
    ],
    providers: [
      { provide: Storage, useValue: {} }
    ]});
    service = TestBed.inject(ImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
