import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { INav } from '../../core/interfaces/blank-nav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  private readonly _Auth = inject(AuthService);
  private readonly _CartService = inject(CartService);
  private readonly _MyTranslateService = inject(MyTranslateService);
  cartCounter: Signal<number> = computed(this._CartService.numOfCartItems);

  navData: INav[] = [
    { id: 1, name: 'home', path: '/home' },
    { id: 2, name: 'products', path: '/products' },
    { id: 3, name: 'cart', path: '/cart' },
    { id: 4, name: 'categories', path: '/categories' },
    { id: 5, name: 'brands', path: '/brands' },
  ];
  navLinks: INav[] = [
    { id: 1, class: 'fa-solid fa-cart-shopping' },
    { id: 2, class: 'fa-facebook fa-brands' },
    { id: 3, class: 'fa-twitter fa-brands' },
    { id: 4, class: 'fa-instagram fa-brands' },
    { id: 5, class: 'fa-linkedin fa-brands' },
    { id: 6, name: 'signout' },
  ];

  ngOnInit(): void {
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        this._CartService.numOfCartItems.set(res.numOfCartItems);
      },
    });
  }

  change(lang: any): void {
    this._MyTranslateService.changeLang(lang.target.value);
  }

  signOut(): void {
    this._Auth.logOut();
  }
}
