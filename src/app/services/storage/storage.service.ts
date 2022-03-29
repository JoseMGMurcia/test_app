import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
  }

  /**
   * Set a value in the device storage for a designed key.
   * @param key 
   * @param value 
   */
  public async set(key: string, value: any) {
    await this.storage?.set(key, value);
  }

  /**
   * Return the value in the storagefor the given key.
   * 
   * Must be used in an asynchronous scope.
   * 
   * @param key 
   * @returns 
   */
  public async get(key: string){
    return await this.storage.get(key);
  }

  /**
   * Removes the given key and value from the device storage.
   * @param key 
   * @returns 
   */
  public remove(key: string){
    return this.storage.remove(key);
  }

}
