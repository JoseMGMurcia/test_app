import { TestBed, waitForAsync } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage-angular';

describe('StorageService', () => {
  let service: StorageService;
  const KEY = 'KEY';
  const VALUE = 'VALUE';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [StorageService],
    });
    service = TestBed.inject(StorageService);
    service.set(KEY, VALUE);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be manually created', () => {
    // Act
    const storage: StorageService = new StorageService(new Storage());

    // Assert
    expect(storage).toBeTruthy();
  });

  it('get should return a Promise', () => {
    // Act
    const response = service.get(KEY);

    // Asert
    expect(response).toBeInstanceOf(Promise);
  });

  it('remove should return a Promise', () => {
    // Act
    const response = service.remove(KEY);

    // Asert
    expect(response).toBeInstanceOf(Promise);
  });

});
