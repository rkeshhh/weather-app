import { Component, OnInit } from "@angular/core";
import { Cookie } from "ng2-cookies";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;
  user_name = "";
  islogin = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.islogin = this.authService.isLoggedIn();
    this.user_name = localStorage.getItem("user_name") || "";
    //this.loggedIn = this.authService.checkCredentials();
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.islogin = false;
  }
}
