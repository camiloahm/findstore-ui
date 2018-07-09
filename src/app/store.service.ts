import {StoreData} from './storedata';
import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable()
export class StoreService {

  constructor(private _http: HttpClient, ) {}

  getStores() {
    // TODO: This url should be move to a ENV Variable 
    const configUrl = 'http://35.233.189.54:8080/stores';
    return this._http.get<StoreData[]>(configUrl);
  }

  getCloseStores(lat: number, lng: number) {
    // TODO: This url should be move to a ENV Variable 
    const configUrl = 'http://35.233.189.54:8080/stores/findCloseStores';
    const httpParams: HttpParams = new HttpParams()
      .append('latitude', String(lat))
      .append('longitude', String(lng));
    return this._http.get<StoreData[]>(configUrl, {params: httpParams});
  }

}
