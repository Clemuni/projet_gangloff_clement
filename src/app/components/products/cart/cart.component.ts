import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ProductState } from '../../../redux/states/product.state';
import { Product } from 'src/app/ts/types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  @Select(ProductState.getProducts) products$!: Observable<Product[]>;
}
