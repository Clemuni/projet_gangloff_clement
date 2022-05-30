import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../ts/types';

@Component({
  selector: 'app-see-details-product-button',
  templateUrl: './see-details-product-button.component.html',
  styleUrls: ['./see-details-product-button.component.scss'],
})
export class SeeDetailsProductButtonComponent implements OnInit {
  @Input() product!: Product;

  constructor() {}

  ngOnInit(): void {}
}
