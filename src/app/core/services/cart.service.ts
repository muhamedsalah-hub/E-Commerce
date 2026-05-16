import { HttpClient } from '@angular/common/http';
import {
  effect,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import {  Observable } from 'rxjs';
import { API_BASE_URL } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numOfCartItems: WritableSignal<number> = signal(0);

  constructor(private readonly _HttpClient: HttpClient) {
    effect(() => {
      let x = this.numOfCartItems();
      localStorage.setItem('cartItem', `${x}`);
    });
  }
  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${API_BASE_URL}/api/v1/cart`, { productId });
  }

  getCartProducts(): Observable<any> {
    return this._HttpClient.get(`${API_BASE_URL}/api/v1/cart`);
  }

  removeSpecificCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`${API_BASE_URL}/api/v1/cart/${productId}`);
  }

  updateProductQuantity(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(`${API_BASE_URL}/api/v1/cart/${productId}`, {
      count,
    });
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${API_BASE_URL}/api/v1/cart`);
  }
}
