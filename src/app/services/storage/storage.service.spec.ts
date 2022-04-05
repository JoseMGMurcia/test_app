import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage-angular';

describe('StorageService', () => {
  let service: StorageService;
  const KEY = 'KEY';
  const mockedCredentials = {
    mail: 'user@componentOnReady.com',
    password: '12345',
    remember: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [StorageService],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('could be manually created', () => {
    const storage: StorageService = new StorageService(new Storage());

    expect(storage).toBeTruthy();
  });

  it('should return a stored key', async () => {
    await service.set(KEY, mockedCredentials);
    const response = await service.get(KEY);

    expect(response).toEqual(mockedCredentials);
  });

  it('should remove a stored key', async () => {
    await service.set(KEY, mockedCredentials);
    await service.remove(KEY);
    const response = await service.get(KEY);

    expect(response).toBeNull();
  });
});
