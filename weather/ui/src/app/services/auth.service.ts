import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { baseUrl } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/users/login`, data);
  }
  register(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${baseUrl}/users/register`, data);
  }
  loginUser(data: any) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user_name", data.name || "XXX");
    localStorage.setItem("_id", data.id);
    return true;
  }
  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token == null || token == "") {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("_id");
    return true;
  }
}
