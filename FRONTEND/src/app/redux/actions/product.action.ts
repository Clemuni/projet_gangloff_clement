import { Product } from '../../redux/models/Product';

export class AddProduct {
  static readonly type = '[Product] Add';

  constructor(public payload: Product) {}
}

export class RemoveProduct {
  static readonly type = '[Product] Remove';

  constructor(public payload: Product) {}
}
