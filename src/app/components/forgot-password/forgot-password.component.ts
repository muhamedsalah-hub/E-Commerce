import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  step: number = 1;

  verifyEmail: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  verifCode: FormGroup = this._FormBuilder.group({
    resetCode: [
      null,
      [Validators.required, Validators.pattern(/^[0-9]{6}$/gi)],
    ],
  });

  resetPassword: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required]],
  });

  verifyEmailSubmit(): void {
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get("email")?.patchValue(emailValue)
    this._AuthService.setVerifyEmail(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          this.step = 2;
        }
      },
    });
  }

  verifyCodeSubmit(): void {
    this._AuthService.setVerifyCode(this.verifCode.value).subscribe({
      next: (res) => {
        if (res.status == 'Success') {
          this.step = 3;
        }
      },
    });
  }

  resetPasswordSubmit(): void {
    this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this._AuthService.getUserData();
          this._Router.navigate(['/home']);
        }
      },
    });
  }
}
