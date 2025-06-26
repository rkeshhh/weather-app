import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseUrl, environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { Cookie } from "ng2-cookies/ng2-cookies";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private router: Router, private http: HttpClient) {}

  registerUser(userData) {
    let params = {
      firstName: userData.firstname,
      lastName: userData.lastname,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
    };

    let headers = new HttpHeaders({
      "Content-type": "application/json",
      Accept: "*/*",
    });
    let options = { headers: headers };

    this.http
      .post(environment.apiUrl + "/user-api/user/add", params, options)
      .subscribe(
        (data) => {
          this.router.navigate(["/login"], {
            state: { message: "Registration Successful.", status: "success" },
          });
        }, //this.saveToken(data),
        (err) => alert(err)
      );
  }

  updateProfile(userData, id) {
    let body = {
      name: userData.name,
      phone: userData.phone,
    };

    this.http.put(`${baseUrl}/users/profile-update?id=${id}`, body).subscribe(
      (data: any) => {
        this.router.navigate(["/"]);
        localStorage.setItem("name", data.name);
      }, //this.saveToken(data),
      (err) => alert(err)
    );
  }

  changePassword(pass, id) {
    this.http
      .get(`${baseUrl}/users/profile-update-pass?id=${id}&pass=${pass}`)
      .subscribe(
        (data) => {
          this.router.navigate(["/"]);
        }, //this.saveToken(data),
        (err) => alert(err)
      );
  }

  getUserDetails() {
    return JSON.parse(Cookie.get("user"));
  }
}
