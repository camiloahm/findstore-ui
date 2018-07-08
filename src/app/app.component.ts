import {Component} from '@angular/core';
import {MouseEvent} from '@agm/core';


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
  zoom = 7;

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

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
      me: true
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
        draggable: false
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
}
