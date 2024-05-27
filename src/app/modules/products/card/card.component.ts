import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Output, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductDto } from '../../../infraestructure/dtos/product.dto';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  product = input.required<ProductDto>();
  //@Output() addToCartEvent = new EventEmitter<ProductDto>();
  addToCartEvent = output<ProductDto>();
  onAddToCart(): void {
    this.addToCartEvent.emit(this.product());
  }
}
