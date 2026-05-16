import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { map } from 'rxjs';
import { IProducts } from '../../core/interfaces/products';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from "@angular/router";
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,TermTextPipe,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  products: IProducts[] = [];

  ngOnInit() {
    this._ProductsService
      .getAllProducts()
      .pipe(map((res) => res.data))
      .subscribe((data) => {
        this.products = data;
      });
  }


   addProductToCart(productId: string) {
      this._CartService.addToCart(productId).subscribe({
        next: (res) => {
          this._CartService.numOfCartItems.set(res.numOfCartItems);
          this._ToastrService.success(res.message, '', {
            positionClass: 'toast-top-center',
          });
        },
        error: (err: HttpErrorResponse) => {
          this._ToastrService.error('Failed : Product is not Added to the cart');
          console.log(err);
        },
      });
    }
}
