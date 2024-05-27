import {
  EnvironmentInjector,
  Injectable,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { ProductDto } from '../dtos/product.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products = signal<ProductDto[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);
  constructor() {
    this.getProducts();
  }
  public getProducts(): void {
    this._http
      .get<ProductDto[]>(`${this._endPoint}/products/?sort=desc`)
      .pipe(
        map((products: ProductDto[]) =>
          products.map((product: ProductDto) => ({ ...product, qty: 1 }))
        ),
        tap((products: ProductDto[]) => this.products.set(products))
      )
      .subscribe();
  }

  public getProductById(id: number) {
    return runInInjectionContext(this._injector, () =>
      toSignal<ProductDto>(
        this._http.get<ProductDto>(`${this._endPoint}/products/${id}`)
      )
    );
  }
  save(product: ProductDto): Observable<ProductDto> {
    return this._http.post<ProductDto>(`${this._endPoint}/products`, product);
  }
  update(product: ProductDto): Observable<ProductDto> {
    return this._http.put<ProductDto>(
      `${this._endPoint}/products/${product.id}`,
      product
    );
  }
}
