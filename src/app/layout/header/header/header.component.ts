import { Component, inject, signal } from '@angular/core';
import { CartStore } from '../../../shared/store/shopping-cart.store';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass, CurrencyPipe, SlicePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showCart = signal<boolean>(false);
  cartStore = inject(CartStore);
}
