import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly _HttpClient: HttpClient) {}
  token = localStorage.getItem('token') ?? '';

  checkOut(cartId: string, shippingDetails: object): Observable<any> {
    return this._HttpClient.post(
      `${API_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: shippingDetails,
      },
    );
  }
  
}
