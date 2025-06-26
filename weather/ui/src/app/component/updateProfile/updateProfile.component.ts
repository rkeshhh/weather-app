import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { CustomvalidationService } from "src/app/services/custom-validation.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "udpateProfile",
  templateUrl: "./updateProfile.component.html",
  styleUrls: ["./updateProfile.component.css"],
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  submitted = false;
  user: {};
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.updateProfileForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
    });
    this.changePasswordForm = new FormGroup({
      password: new FormControl("", [Validators.required]),
    });
  }

  updateProfile(): void {
    this.submitted = true;
    if (this.updateProfileForm.valid) {
      console.log(this.updateProfileForm.value);
      this.userService.updateProfile(
        this.updateProfileForm.value,
        localStorage.getItem("_id")
      );
    }
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      console.log(this.changePasswordForm.value.password);
      this.userService.changePassword(
        this.changePasswordForm.value.password,
        localStorage.getItem("_id")
      );
      // console.log(this.changePasswordForm.value);
      // this.userService.changePassword(
      //   this.changePasswordForm.value,
      //   localStorage.getItem("_id")
      // );
    }
    // if (this.changePasswordForm.valid) {
    //   // this.userService.changePassword(
    //   //   this.changePasswordControl.password.value
    //   // );
    // }
  }
}
