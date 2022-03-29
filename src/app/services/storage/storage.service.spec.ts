import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {

    const storageIonicMock: any = {
      get: () => new Promise<any>((resolve, reject) => resolve('Demo Test User')),
      set: () => new Promise<any>((resolve, reject) => resolve('Demo Test User')),
     };

     TestBed.configureTestingModule({
      imports: [
        IonicStorageModule.forRoot()
      ],
      providers: [
        StorageService
      ]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
