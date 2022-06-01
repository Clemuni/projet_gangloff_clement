import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ProductState } from '../../../redux/states/product.state';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/redux/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Select(ProductState.getProductCount) productCount$!: Observable<number>;

  currentUser!: User;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
