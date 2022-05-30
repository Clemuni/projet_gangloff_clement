import { Component, OnInit } from '@angular/core';
import { Product } from '../../../ts/types';
import { ActivatedRoute } from '@angular/router';
import { MonService } from '../../../services/mon-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  productLabel!: string;
  product!: Product | undefined;

  getCatalogSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private monService: MonService) {}

  ngOnInit(): void {
    this.productLabel = this.route.snapshot.params['label'];

    this.getCatalogSubscription = this.monService
      .getCatalog()
      .subscribe(
        (catalog: Product[]) =>
          (this.product = catalog.find(
            (product: Product) => product.label === this.productLabel
          ))
      );
  }

  ngOnDestroy(): void {
    this.getCatalogSubscription?.unsubscribe();
  }
}
