import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  Info: any;
  Experience: any[] = [];
  IsVisible = false;

  private observer!: IntersectionObserver;

  constructor(
    private _portfolio: PortfolioService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.Info = this._portfolio.GetPersonalInfo();
    this.Experience = this._portfolio.GetExperience();
  }

  ngAfterViewInit() {
    const el = document.getElementById('about');
    if (!el) return;
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.IsVisible = true;
        this._cdr.detectChanges();
      }
    }, { threshold: 0.15 });
    this.observer.observe(el);
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }
}
