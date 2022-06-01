import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  errorMsg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.formLogin.valid) {
      this.authService
        .postLogin(this.username?.value, this.password?.value)
        .subscribe(
          (data) => {
            this.router.navigate(['/']);
          },
          (errorResponse) => {
            if (errorResponse['status'] == 404) {
              this.errorMsg = "Pas d'url correspondante :(";
            } else {
              this.errorMsg = errorResponse['error']['error'];
            }
          }
        );
    } else {
      Object.keys(this.formLogin.controls).forEach((field) => {
        const control = this.formLogin.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  get username() {
    return this.formLogin.get('username');
  }
  get password() {
    return this.formLogin.get('password');
  }
}
