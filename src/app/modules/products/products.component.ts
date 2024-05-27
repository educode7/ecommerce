import { Component, inject } from '@angular/core';
import { CartStore } from '../../shared/store/shopping-cart.store';
import { ProductDto } from '../../infraestructure/dtos/product.dto';
import { ProductService } from '../../infraestructure/services/product.service';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export default class ProductsComponent {
  private readonly productSvc = inject(ProductService);
  products = this.productSvc.products;
  cartStore = inject(CartStore);

  onAddToCart(product: ProductDto): void {
    this.cartStore.addToCart(product);
  }
}
