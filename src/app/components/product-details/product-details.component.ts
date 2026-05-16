import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProducts } from '../../core/interfaces/products';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
   private readonly _CartService = inject(CartService);
    private readonly _ToastrService = inject(ToastrService);
  productDetails: IProducts | null = null;


  ngOnInit(): void {
    console.log(
      this._ActivatedRoute.paramMap.subscribe({
        next: (params) => {
          const productId = params.get('productId');
          this._ProductsService.getSpecificProduct(productId).subscribe({
            next: (res) => {
              this.productDetails = res.data;
            },
          });
        },
      }),
    );
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
