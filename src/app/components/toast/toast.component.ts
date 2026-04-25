import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService, Toast } from '../../services/toast.service';
import { Subscription } from 'rxjs';
import { ENUM_MessageBox_Status } from '../../shared/enum';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit, OnDestroy {
  Toasts: Toast[] = [];
  private sub!: Subscription;
  ToastEnum = ENUM_MessageBox_Status;

  constructor(private _toastService: ToastService) {}

  ngOnInit() {
    this.sub = this._toastService.toasts$.subscribe(t => this.Toasts = t);
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  Dismiss(id: string) { this._toastService.dismiss(id); }

  TrackById(_: number, t: Toast) { return t.id; }
}
