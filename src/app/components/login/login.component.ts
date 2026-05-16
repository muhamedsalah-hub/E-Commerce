import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading: boolean = false;
  msgError: string = '';
  private readonly _Auth = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _ToastrService=inject(ToastrService)

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  LoginSubmit(): void {
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      this.isLoading = true;
      this._Auth.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            localStorage.setItem('token', res.token);
            this._Auth.getUserData();
            this._Router.navigate(['/home']);
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this._ToastrService.error(err.error.message)
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
