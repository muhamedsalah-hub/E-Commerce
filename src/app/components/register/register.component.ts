import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '../../../../node_modules/@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy{
  isLoading: boolean = false;
  msgError: string = '';
  private readonly _Auth = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  registerSubmitSub!: Subscription;


  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/gi)]],
      rePassword: [null],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.confirmPassword },
  );

  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/gi),
  //     ]),
  //     rePassword: new FormControl(null),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^01[0125][0-9]{8}$/),
  //     ]),
  //   },
  //   this.confirmPassword,
  // );

  registerSubmit(): void {
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      this.isLoading = true;
      this.registerSubmitSub = this._Auth
        .setRegisterForm(this.registerForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message == 'success') {
              this._Router.navigate(['/login']);
            }
            this.isLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.msgError = err.error.message;
            this.isLoading = false;
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
      this.registerForm.setErrors({ mismatch: true });
    }
  }

  isValidInput(name: string): boolean | undefined {
    return (
      !this.registerForm.get(name)?.errors &&
      this.registerForm.get(name)?.touched
    );
  }

  isInValidInput(name: string): boolean | undefined {
    return (
      !!this.registerForm.get(name)?.errors &&
      this.registerForm.get(name)?.touched
    );
  }

  confirmPassword(G: AbstractControl) {
    if (G.get('password')?.value == G.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
  ngOnDestroy(): void {
    this.registerSubmitSub?.unsubscribe();
  }
}
