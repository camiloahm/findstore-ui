import { StoreData } from './storedata';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable()
export class StoreService {

  constructor(private _http:HttpClient,) { }

  getStores(){
    const configUrl = 'http://localhost:8080/stores';
    return this._http.get<StoreData[]>(configUrl);
  }

  getCloseStores(lat: number, lng: number){
    const configUrl = 'http://localhost:8080/stores/findCloseStores';
    return this._http.get<StoreData[]>(configUrl);
  }

}