import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddProduct } from '../../../../redux/actions/product.action';
import { Product } from '../../../../ts/types';

@Component({
  selector: 'app-add-product-button',
  templateUrl: './add-product-button.component.html',
  styleUrls: ['./add-product-button.component.scss'],
})
export class AddProductButtonComponent {
  @Input() product!: Product;

  constructor(private store: Store) {}

  addProduct(): void {
    this.store.dispatch(new AddProduct(this.product));
  }
}
