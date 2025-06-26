import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { baseUrl, environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WeatherCallService {
  url = environment.weatherApiUrl;
  apiKey = environment.weatherApiKey;

  constructor(private http: HttpClient) {}

  getWeatherDataByCoords(lat, lon) {
    let params = new HttpParams().set("lat", lat).set("lon", lon);

    return this.http.get(`${baseUrl}/api-data/today/lonlat`, {
      params,
    });
  }

  getWeatherDataByCityName(city: string) {
    return this.http.get(`${baseUrl}/api-data/today/city?q=${city}`);
  }

  getWeatherForecast(lat, lon) {
    let params = new HttpParams().set("lat", lat).set("lon", lon);

    return this.http.get(`${baseUrl}/api-data/daily/lonlat`, {
      params,
    });
  }
}
