import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { RemoveProduct } from '../../../../redux/actions/product.action';
import { Product } from '../../../../ts/types';

@Component({
  selector: 'app-remove-product-button',
  templateUrl: './remove-product-button.component.html',
  styleUrls: ['./remove-product-button.component.scss'],
})
export class RemoveProductButtonComponent {
  @Input() product!: Product;

  constructor(private store: Store) {}

  removeProduct(): void {
    this.store.dispatch(new RemoveProduct(this.product));
  }
}
