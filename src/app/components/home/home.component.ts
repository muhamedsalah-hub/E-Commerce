import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IProducts } from '../../core/interfaces/products';
import { map, Observable, Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

import { TermTextPipe } from '../../core/pipes/term-text.pipe';

import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
    TermTextPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  products: WritableSignal<Observable<IProducts[]>> = signal(
    this._ProductsService.getAllProducts().pipe(map((res) => res.data)),
  );
  categories: WritableSignal<ICategories[]> = signal([]);
  getAllProductsSub!: Subscription;
  date = new Date();
  searchedProduct: string = '';

  categoriesOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    rtl: true,
    nav: true,
  };

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
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

  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe();
  }
}
