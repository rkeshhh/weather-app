import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { Cookie } from "ng2-cookies";
import { AuthService } from "src/app/services/auth.service";
import { WeatherCallService } from "src/app/services/weather-call.service";
import { WeatherWishlistService } from "src/app/services/weather-wishlist.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  weatherData: any = {};
  weatherForecast: any = {};
  wishlist: any = [];
  coords: Icoords;
  moreInfo: boolean = false;
  showForecast: boolean = false;
  moreInfoText: string = "More Info";
  forecastText: string = "Forecast";
  sunrise_time: any;
  sunset_time: any;
  flag: boolean = true;
  loggedIn = false;

  constructor(
    private weatherService: WeatherCallService,
    private wishlistService: WeatherWishlistService,
    private authService: AuthService
  ) {}
  refreshPage = true;
  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    this.currentLocation();
    this.getWishlist();
  }

  currentLocation() {
    if ("geolocation" in navigator) {
      this.coords = {
        lat: null,
        lon: null,
      };
      navigator.geolocation.watchPosition((position) => {
        this.coords.lat = position.coords.latitude;
        this.coords.lon = position.coords.longitude;
        if (this.flag == true) {
          this.getLocation(this.coords);
          this.flag = false;
        }
      });
    }
  }

  getLocation(position: Icoords) {
    const promise = this.weatherService
      .getWeatherDataByCoords(position.lat, position.lon)
      .toPromise();

    promise.then(
      (data) => {
        this.weatherData = data;
        this.getForecast(data["coord"].lat, data["coord"].lon);
      },
      (error) => {
        this.weatherData = error;
      }
    );
  }

  getCity(city: string) {
    const promise = this.weatherService
      .getWeatherDataByCityName(city)
      .toPromise();

    promise.then(
      (data) => {
        this.weatherData = data;
        console.log(this.weatherData);
        this.getForecast(data["coord"].lat, data["coord"].lon);
      },
      (error) => {
        this.weatherData = error;
      }
    );
  }

  getForecast(lat, lon) {
    const promise = this.weatherService
      .getWeatherForecast(lat, lon)
      .toPromise();
    promise.then(
      (data) => {
        this.weatherForecast = data;
      },
      (error) => {
        this.weatherForecast = error;
      }
    );
  }

  more_info() {
    if (this.moreInfo === false) {
      this.moreInfo = true;
      this.moreInfoText = "Hide Info";
      var date1 = new Date(this.weatherData.sys.sunrise * 1000);
      var date2 = new Date(this.weatherData.sys.sunset * 1000);
      this.sunrise_time = date1.toLocaleTimeString();
      this.sunset_time = date2.toLocaleTimeString();
    } else if (this.moreInfo === true) {
      this.moreInfo = false;
      this.moreInfoText = "Show More Info";
    }
  }

  weatherForecastInfo() {
    if (this.showForecast === false) {
      this.showForecast = true;
      this.forecastText = "Hide Forecast";
      var date1 = new Date(this.weatherData.sys.sunrise * 1000);
      var date2 = new Date(this.weatherData.sys.sunset * 1000);
      this.sunrise_time = date1.toLocaleTimeString();
      this.sunset_time = date2.toLocaleTimeString();
    } else if (this.showForecast === true) {
      this.showForecast = false;
      this.forecastText = "Show Forecast";
    }
  }

  getWishlist() {
    if (localStorage.getItem("token")) {
      const id = localStorage.getItem("_id");
      const promise = this.wishlistService.getWishlist(id).toPromise();
      promise.then(
        (data) => {
          this.wishlist = data;
          console.log(this.wishlist);
        },
        (error) => {
          this.wishlist = error;
        }
      );
    } else {
      this.wishlist = [
        { city: "Mumbai" },
        { city: "Delhi" },
        { city: "Bangalore" },
        { city: "Kolkata" },
      ];
    }
  }

  addToWishlist(weatherData: any) {
    const promise = this.wishlistService.addToWishlist(weatherData).toPromise();

    promise.then(
      (data) => {
        this.wishlist = data;
        this.getWishlist();
      },
      (error) => {
        this.weatherData = error;
      }
    );
  }

  removeFromWishlist() {
    const userId = localStorage.getItem("_id");
    const promise = this.wishlistService
      .removeFromWishlist(this.weatherData.id, userId)
      .toPromise();

    promise.then(
      (data) => {
        this.wishlist = data;
        this.getWishlist();
      },
      (error) => {}
    );
  }

  showRemoveWishlist() {
    let show = this.wishlist.find((data) => data.city == this.weatherData.name);
    return show;
  }

  showAddWishlist() {
    let show = false;
    show = this.wishlist.find((data) => data.city == this.weatherData.name);
    return !show && !(this.wishlist.length == 10);
  }
}

interface Icoords {
  lat: number;
  lon: number;
}
