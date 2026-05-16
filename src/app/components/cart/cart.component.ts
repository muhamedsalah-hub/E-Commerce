import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  cartItems: ICart = {} as ICart;

  ngOnInit(): void {
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartItems = res.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  deleteCartItem(productId: string): void {
    this._CartService.removeSpecificCartItem(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartItems = res.data;
        this._CartService.numOfCartItems.set(res.numOfCartItems);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  updateItemQuantity(productId: string, count: number) {
    this._CartService.updateProductQuantity(productId, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartItems = res.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  clearAllItems(): void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this._CartService.numOfCartItems.set(0);
          this.cartItems = {} as ICart;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
