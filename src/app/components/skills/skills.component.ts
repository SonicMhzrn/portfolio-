import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { PortfolioService, Skill } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  Skills: Skill[] = [];
  FilteredSkills: Skill[] = [];
  Categories: string[] = [];
  SelectedCategory = 'All';
  IsVisible = false;
  AnimatedSkills: Set<string> = new Set();

  private observer!: IntersectionObserver;

  constructor(
    private _portfolio: PortfolioService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.Skills = this._portfolio.GetSkills();
    this.FilteredSkills = [...this.Skills];
    this.Categories = this._portfolio.GetSkillCategories();
  }

  ngAfterViewInit() {
    const el = document.getElementById('skills');
    if (!el) return;
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.IsVisible = true;
        setTimeout(() => this.AnimateSkills(), 200);
        this._cdr.detectChanges();
      }
    }, { threshold: 0.15 });
    this.observer.observe(el);
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  AnimateSkills() {
    this.Skills.forEach((skill, i) => {
      setTimeout(() => {
        this.AnimatedSkills.add(skill.Name);
        this._cdr.detectChanges();
      }, i * 80);
    });
  }

  SelectCategory(cat: string) {
    this.SelectedCategory = cat;
    this.FilteredSkills = cat === 'All'
      ? [...this.Skills]
      : this.Skills.filter(s => s.Category === cat);
  }

  GetSkillColor(level: number): string {
    if (level >= 90) return 'from-violet-500 to-indigo-500';
    if (level >= 80) return 'from-indigo-500 to-blue-500';
    if (level >= 70) return 'from-blue-500 to-cyan-500';
    return 'from-cyan-500 to-teal-500';
  }
}
