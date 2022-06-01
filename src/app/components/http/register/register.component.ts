import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
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
    this.formRegister = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
        email: ['', [Validators.required, ValidationService.emailValidator]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
      },
      { validators: ValidationService.passwordsValidator }
    );
  }

  onSubmit(): void {
    if (this.formRegister.valid) {
      this.authService
        .postRegister(
          this.email?.value,
          this.password?.value,
          this.first_name?.value,
          this.last_name?.value,
          this.username?.value
        )
        .subscribe(
          (data) => {
            this.router.navigate(['client/login']);
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
      Object.keys(this.formRegister.controls).forEach((field) => {
        const control = this.formRegister.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  get username() {
    return this.formRegister.get('username');
  }
  get password() {
    return this.formRegister.get('password');
  }
  get confirm_password() {
    return this.formRegister.get('confirm_password');
  }
  get email() {
    return this.formRegister.get('email');
  }
  get first_name() {
    return this.formRegister.get('first_name');
  }
  get last_name() {
    return this.formRegister.get('last_name');
  }
}
