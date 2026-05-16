import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private translate = inject(TranslateService);
  private _PLATFORM_ID = inject(PLATFORM_ID);
  private _renderer2 = inject(RendererFactory2).createRenderer(null, null);

  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      // this.translate.addLangs(['en', 'ar']);
      this.translate.setFallbackLang('en');
      this.setLang();
    }
  }

  setLang() {
    let selectedLang = localStorage.getItem('lang') ?? '';
    // console.log(selectedLang);
    
    if (selectedLang != null) {
      this.translate.use(selectedLang);
    }

    if (selectedLang == 'en') {
      this._renderer2.setProperty(document.documentElement, 'dir', 'ltr');
      this._renderer2.setProperty(document.documentElement, 'lang', 'en');
    } else if (selectedLang == 'ar') {
      this._renderer2.setProperty(document.documentElement, 'dir', 'rtl');
      this._renderer2.setProperty(document.documentElement, 'lang', 'ar');
    }
  }

  changeLang(lang: string) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem('lang', lang);
      this.setLang();
    }
  }
  
}
