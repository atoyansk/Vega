import { SaveVehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class VehicleService {

  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getFeatures() {
    return this.http.get('/api/features')
      .map(res => res.json());
  }

  getMakes() {
    return this.http.get('/api/makes')
      .map(res => res.json());
  }

  create(vehicle) {
    return this.authHttp.post('/api/vehicles', vehicle)
      .map(res => res.json());
  }

  getVehicle(id) {
    return this.http.get('/api/vehicles/' + id)
      .map(res => res.json());
  }

  getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
      .map(res => res.json());
  }

  toQueryString(obj){
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined) 
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
      
    return parts.join('&');
  }

  update(vehicle: SaveVehicle) {
    return this.authHttp.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle)
      .map(res => res.json());
  }

  delete(id) {
    return this.authHttp.delete('/api/vehicles/' + id)
      .map(res => res.json());
  }


}
