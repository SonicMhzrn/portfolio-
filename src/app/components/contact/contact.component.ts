import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ToastService } from '../../services/toast.service';
import { ENUM_MessageBox_Status } from '../../shared/enum';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  Info: any;
  SocialLinks: any[] = [];
  ContactForm!: FormGroup;
  SubmitState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  IsVisible = false;
  

  private observer!: IntersectionObserver;

  constructor(
    private _portfolio: PortfolioService,
    private _toast: ToastService,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.Info = this._portfolio.GetPersonalInfo();
    this.SocialLinks = this._portfolio.GetSocialLinks();

    this.ContactForm = this._fb.group({
      Name: ['', [Validators.required, Validators.minLength(2)]],
      Email: ['', [Validators.required, Validators.email]],
      Subject: ['', Validators.required],
      Message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  ngAfterViewInit() {
    const el = document.getElementById('contact');
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

  get F() { return this.ContactForm.controls; }

  OnSubmit() {
    if (this.ContactForm.invalid) {
      this.ContactForm.markAllAsTouched();
      this._toast.show('Please fill in all required fields correctly.', ENUM_MessageBox_Status.Error);
      return;
    }
    this.SubmitState = 'loading';
    setTimeout(() => {
      this.SubmitState = 'success';
      this.ContactForm.reset();
      this._toast.show("Message sent! I'll get back to you within 24 hours.",ENUM_MessageBox_Status.Success);
      this._cdr.detectChanges();
    }, 1800);
  }

  Reset() { this.SubmitState = 'idle'; }
}
