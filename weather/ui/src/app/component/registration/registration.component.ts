import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CustomvalidationService } from "src/app/services/custom-validation.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  regFormGroup!: FormGroup;
  submitted = false;
  constructor(private autService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.regFormGroup = new FormGroup({
      name: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.regFormGroup.valid) {
      console.log(this.regFormGroup.value);
      this.autService.register(this.regFormGroup.value).subscribe((res) => {
        this.router.navigate(["/login"]);
      });
    } else {
      console.log("error");
    }
  }
}
