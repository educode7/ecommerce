import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { ToastrService } from 'ngx-toastr';
import { ProductDto } from '../../infraestructure/dtos/product.dto';

export interface CartStore {
  products: ProductDto[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    productsCount: computed(() => calculateProductCount(products())),
    totalAmount: computed(() => calculateTotalAmount(products())),
  })),
  withMethods(({ products, ...store }, toastSvc = inject(ToastrService)) => ({
    addToCart(product: ProductDto) {
      const isProductInCart = products().find(
        (item: ProductDto) => item.id === product.id
      );

      if (isProductInCart) {
        isProductInCart.qty++;
        isProductInCart.subTotal = isProductInCart.qty * isProductInCart.price;
        patchState(store, { products: [...products()] });
      } else {
        patchState(store, { products: [...products(), product] });
      }
      console.log('Product added', 'DOMINI STORE');
      toastSvc.success('Product added', 'DOMINI STORE');
    },
    removeFromCart(id: number) {
      const updatedProducts = products().filter((product) => product.id !== id);
      patchState(store, { products: updatedProducts });
      toastSvc.success('Product removed', 'DOMINI STORE');
    },
    clearCart() {
      patchState(store, initialState);
      toastSvc.success('Cart cleared', 'DOMINI STORE');
    },
  }))
);

function calculateTotalAmount(products: ProductDto[]): number {
  return products.reduce(
    (acc, product) => acc + product.price * product.qty,
    0
  );
}

function calculateProductCount(products: ProductDto[]): number {
  return products.reduce((acc, product) => acc + product.qty, 0);
}
