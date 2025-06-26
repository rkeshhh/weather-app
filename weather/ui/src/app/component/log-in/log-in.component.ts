import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"],
})
export class LogInComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private autService: AuthService, private router: Router) {}

  // loginForm = this.formBuilder.group({
  //   username: ["", Validators.min(3)],
  //   password: ["", Validators.required],
  // });

  ngOnInit(): void {
    this.autService.isLoggedIn() ? this.router.navigate(["/"]) : null;
    this.formGroup = new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.autService.login(this.formGroup.value).subscribe(
        (res) => {
          console.log(res);
          this.autService.loginUser(res);
          window.location.reload();
        },
        (err) => {
          console.log(err);
          this.autService.logout();
        }
      );
    }
  }
}
