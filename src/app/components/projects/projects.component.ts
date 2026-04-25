import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ChangeDetectorRef, HostListener
} from '@angular/core';
import { PortfolioService, Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  Projects: Project[] = [];
  IsVisible = false;
  SelectedProject: Project | null = null;
  IsModalOpen = false;

  private observer!: IntersectionObserver;

  constructor(
    private _portfolio: PortfolioService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.Projects = this._portfolio.GetProjects();
  }

  ngAfterViewInit() {
    const el = document.getElementById('projects');
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

  OpenProject(project: Project) {
    this.SelectedProject = project;
    this.IsModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseModal() {
    this.IsModalOpen = false;
    this.SelectedProject = null;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  OnEscape() {
    if (this.IsModalOpen) this.CloseModal();
  }
}
