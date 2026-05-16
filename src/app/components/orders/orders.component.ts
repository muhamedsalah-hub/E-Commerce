import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);

  cartId: string = '';
  orderDetails: FormGroup = this._FormBuilder.group({
    details: [null, Validators.required],
    phone: [null, Validators.required],
    city: [null, Validators.required],
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('cartId') as string;
      },
    });
  }

  orderSubmit(): void {
    this._OrdersService
      .checkOut(this.cartId!, this.orderDetails.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 'success') {
            window.open(res.session.url);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }
}
