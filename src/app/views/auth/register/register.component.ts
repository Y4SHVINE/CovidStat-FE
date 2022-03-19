import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import {
  passwordMatchingValidatior,
  validateAllFormFields,
} from "../../../utils/reactiveForms.util";

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html",
})
export class RegisterComponent {
  registerForm: FormGroup;
  isError = false;
  isLoading = false;
  errorMsg = "";

  constructor(private router: Router, private authService: AuthService) {
    this.registerForm = new FormGroup({
      nic: new FormControl("", [
        Validators.required,
        Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      repeatPassword: new FormControl("", [Validators.required]),
      isAdmin: new FormControl(false),
    });
  }

  registerUser = () => {
    this.isLoading = true;
    if (
      this.registerForm.get("password").value !=
      this.registerForm.get("repeatPassword").value
    ) {
      this.isError = true;
      this.errorMsg = "Password does not match!";
      setTimeout(() => {
        this.isError = false;
        this.errorMsg = "";
      }, 2500);
      this.isLoading = false;
      return;
    }
    validateAllFormFields(this.registerForm);
    if (this.registerForm.valid) {
      this.authService.createUser(this.registerForm.value).subscribe(
        (res) => {
          if (res) {
            this.router.navigate(["/login"]);
            this.isLoading = false;
          }
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.isError = true;
          this.errorMsg = "Something Went Wrong!";
          setTimeout(() => {
            this.isError = false;
            this.errorMsg = "";
          }, 2500);
        }
      );
    }else{
      this.isLoading = false;
    }
  };
}
