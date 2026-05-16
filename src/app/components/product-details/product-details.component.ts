import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProducts } from '../../core/interfaces/products';

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
}
