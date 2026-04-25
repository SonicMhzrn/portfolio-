import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private _isDark = new BehaviorSubject<boolean>(true);
  isDark$ = this._isDark.asObservable();

  constructor(factory: RendererFactory2) {
    this.renderer = factory.createRenderer(null, null);
    const saved = localStorage.getItem('theme');
    const dark = saved ? saved === 'dark' : true;
    this._isDark.next(dark);
    this.apply(dark);
  }

  toggle() {
    const next = !this._isDark.value;
    this._isDark.next(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    this.apply(next);
  }

  get isDark() { return this._isDark.value; }

  private apply(dark: boolean) {
    if (dark) {
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
    }
  }
}
