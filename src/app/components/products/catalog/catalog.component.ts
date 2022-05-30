import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MonService } from '../../../services/mon-service.service';
import { Product, FormInputChangeEventValues } from '../../../ts/types';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  catalog: Product[] = [];
  filterText: string = '';

  getCatalogSubscription: Subscription | null = null;

  constructor(private monService: MonService) {}

  ngOnInit(): void {
    this.getCatalogSubscription = this.monService
      .getCatalog()
      .subscribe((catalog: Product[]) => (this.catalog = catalog));
  }

  handleFilterEvent(parameters: FormInputChangeEventValues): void {
    this.getCatalogSubscription = this.monService
      .getCatalog()
      .subscribe(
        (catalog: Product[]) =>
          (this.catalog = catalog.filter((product) =>
            product.label.toLowerCase().includes(parameters.value.toLowerCase())
          ))
      );
  }

  ngOnDestroy(): void {
    this.getCatalogSubscription?.unsubscribe();
  }
}
