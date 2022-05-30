import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() username: string = '';
  @Input() password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  connexion() {
    console.log(this.username, this.password);
    this.authService
      .postLogin(this.username, this.password)
      .subscribe((flux) => console.log(flux));
  }
}
