import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ProductDto } from '../dtos/product.dto';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly _http = inject(HttpClient);
  private readonly _url = environment.serverURL;

  onProceedToPay(products: ProductDto[]) {
    return this._http
      .post(`${this._url}/checkout`, { items: products })
      .pipe(
        map(async (res: any) => {
          console.log(res);
          //const stripe = await loadStripe(environment.stripeAPIKey);
          //stripe?.redirectToCheckout({ sessionId: res.id });
        })
      )
      .subscribe({
        error: (err) => console.error('Error', err),
      });
  }
}
