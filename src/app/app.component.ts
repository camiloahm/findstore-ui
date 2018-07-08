import {Component} from '@angular/core';
import {MouseEvent} from '@agm/core';
import {CommonModule} from '@angular/common';


import {StoreService} from './store.service';
import {StoreData} from './storedata';

@Component({
  selector: 'my-app',
  providers: [StoreService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  markers: Marker[] = [];

  // google maps zoom level 
  zoom = 11;

  // initial center position for the map
  lat = 51.6047547;
  lng = 5.4735158;

  constructor(private storeService: StoreService) {
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    const lat = $event.coords.lat;
    const lng = $event.coords.lng;

    // Removes my position after click
    this.markers = [];

    this.markers.push({
      lat: lat,
      lng: lng,
      label: 'Me',
      draggable: false,
      me: true,
      iconUrl: './assets/images/smalluser.png'
    });

    this.findNearStores(lat, lng);
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


  findNearStores(lat: number, lng: number) {
    return this.storeService.getCloseStores(lat, lng).subscribe(
      (data: StoreData[]) => {
        const response: Marker[] = this.mapStoresToMarkers(data);
        this.markers = this.markers.concat(response);
      });
  }


  loadAllStoresInMarkers() {
    this.storeService.getStores().subscribe(
      data => this.markers = this.mapStoresToMarkers(data)
    );
  }


  mapStoresToMarkers(stores: Array<StoreData>) {
    return stores.map((store) => {
      return {
        lat: store.latitude,
        lng: store.longitude,
        label: store.addressName,
        draggable: false,
        iconUrl: './assets/images/smallmarker.ico',
        street: store.street.concat(' ',store.street2,' ',store.street3),
        postalCode: store.postalCode,
        todayOpen: store.todayOpen,
        todayClose: store.todayClose,
        locationType: store.locationType,
        city: store.city
      };
    });
  }

}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  me?: boolean;
  street?: string;
  iconUrl?: string;
  postalCode?: string;
  todayOpen?: string;
  todayClose?: string;
  locationType?: string;
  city?: string
}
