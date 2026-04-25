import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  Info: any;
  Stats: any[] = [];
  IsVisible = false;
  PagePermission:any;

  // Typing animation
  CurrentWordIndex = 0;
  DisplayWord = '';
  // Words = ['Developer', 'Designer', 'Problem Solver', 'Innovator'];
  Words = ['Developer', 'Designer', 'Problem Solver', 'Tech Enthusiast', 'Lifelong Learner'];
  private typingTimer: any;
  private observer!: IntersectionObserver;

  constructor(
    private _portfolio: PortfolioService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.Info = this._portfolio.GetPersonalInfo();
    this.Stats = this._portfolio.GetStats();
    this.PagePermission = this._portfolio.GetPagePermission();
  }

  ngAfterViewInit() {
    this.typeWord();
    this.SetupObserver();
  }

  ngOnDestroy() {
    clearTimeout(this.typingTimer);
    if (this.observer) this.observer.disconnect();
  }

  SetupObserver() {
    const el = document.getElementById('hero');
    if (!el) return;
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.IsVisible = true;
        this._cdr.detectChanges();
      }
    }, { threshold: 0.15 });
    this.observer.observe(el);
  }

  typeWord() {
    const word = this.Words[this.CurrentWordIndex];
    let i = 0;
    this.DisplayWord = '';
    const type = () => {
      if (i < word.length) {
        this.DisplayWord += word[i++];
        this._cdr.detectChanges();
        this.typingTimer = setTimeout(type, 85);
      } else {
        this.typingTimer = setTimeout(() => this.eraseWord(), 2000);
      }
    };
    type();
  }

  eraseWord() {
    const erase = () => {
      if (this.DisplayWord.length > 0) {
        this.DisplayWord = this.DisplayWord.slice(0, -1);
        this._cdr.detectChanges();
        this.typingTimer = setTimeout(erase, 50);
      } else {
        this.CurrentWordIndex = (this.CurrentWordIndex + 1) % this.Words.length;
        this.typingTimer = setTimeout(() => this.typeWord(), 300);
      }
    };
    erase();
  }
}
