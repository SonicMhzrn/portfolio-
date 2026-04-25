import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  IsScrolled = false;
  IsMobileMenuOpen = false;
  ActiveSection = 'hero';
  Info: any;
  IsDark = true;
  private sub!: Subscription;

  NavLinks = [
    { Label: 'Home', Section: 'hero' },
    { Label: 'About', Section: 'about' },
    { Label: 'Skills', Section: 'skills' },
    { Label: 'Projects', Section: 'projects' },
    { Label: 'Contact', Section: 'contact' },
  ];

  constructor(
    private _portfolio: PortfolioService,
    public _themeService: ThemeService
  ) {}

  ngOnInit() {
    this.Info = this._portfolio.GetPersonalInfo();
    this.sub = this._themeService.isDark$.subscribe(d => this.IsDark = d);
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  @HostListener('window:scroll')
  OnScroll() {
    this.IsScrolled = window.scrollY > 40;
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    for (const id of sections.reverse()) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) {
        this.ActiveSection = id;
        break;
      }
    }
  }

  ScrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    this.IsMobileMenuOpen = false;
  }

  ToggleMobileMenu() { this.IsMobileMenuOpen = !this.IsMobileMenuOpen; }
  ToggleTheme() { this._themeService.toggle(); }
  IsActive(section: string) { return this.ActiveSection === section; }
}
