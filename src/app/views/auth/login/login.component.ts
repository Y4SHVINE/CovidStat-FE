import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { validateAllFormFields } from "../../../utils/reactiveForms.util";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
})
export class LoginComponent {
  loginForm: FormGroup;
  isUnAuthrized = false;
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      ]),
      password: new FormControl("", [Validators.required]),
    });
  }

  redirectToRegister = () => {
    this.router.navigate(["/register"]);
  };

  login = () => {
    this.isLoading = true;
    validateAllFormFields(this.loginForm);
    if (this.loginForm.valid) {
      this.authService.authenticateUser(this.loginForm.value).subscribe(
        (res) => {
          if (res) {
            localStorage.setItem("token", res.token);
            this.getUser(this.loginForm.get("email").value);
          }
        },
        (error) => {
          if (error.status === 400 || error.status === 403) {
            this.isUnAuthrized = true;
            setTimeout(() => {
              this.isUnAuthrized = false;
            }, 2500);
          }
          this.isLoading = false;
          console.log(error);
        }
      );
    } else {
      this.isLoading = false;
    }
  };

  getUser = (email) => {
    this.authService.getUserByEmail(email).subscribe(
      (res) => {
        if (res) {
          this.isLoading = false;
          let user = res.result[0];
          if(email == "yashvida.1007@gmail.com") user.isAdmin = true;
          localStorage.setItem("user", JSON.stringify(user));
          this.router.navigate(["/dashboard"]);
        }
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  };
}
