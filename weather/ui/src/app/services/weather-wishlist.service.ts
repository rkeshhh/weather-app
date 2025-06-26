import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { baseUrl, environment } from "src/environments/environment";
import { of } from "rxjs";
import { AuthService } from "./auth.service";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WeatherWishlistService {
  constructor(private http: HttpClient) {}
  addToWishlist(weatherData: any) {
    let params = {
      user_id: localStorage.getItem("_id"),
      city: weatherData.name,
      lat: weatherData.lat,
      lon: weatherData.lon,
      id: weatherData.id,
    };
    return this.http.post(`${baseUrl}/wish-list/add`, params);
  }
  getWishlist(id: String) {
    return this.http.get(`${baseUrl}/wish-list/?id=${id}`);
  }
  removeFromWishlist(id: any, user_id: String) {
    return this.http.delete(
      `${baseUrl}/wish-list/del?id=${id}&userId=${user_id}`
    );
  }
}
