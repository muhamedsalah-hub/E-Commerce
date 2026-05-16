import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('token')) {
    if (
      req.url.includes('cart') ||
      req.url.includes('wishlist') ||
      req.url.includes('orders')
    ) {
      const token = localStorage.getItem('token') ?? '';
      req = req.clone({ setHeaders: { token } });
    }
  }

  return next(req);
};
