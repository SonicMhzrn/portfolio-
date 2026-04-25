import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ENUM_MessageBox_Status } from '../shared/enum';

export interface Toast {
  id: string;
  message: string;
  type: ENUM_MessageBox_Status;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = new BehaviorSubject<Toast[]>([]);
  toasts$ = this._toasts.asObservable();

  show(message: string, type: ENUM_MessageBox_Status.Success| ENUM_MessageBox_Status.Error| ENUM_MessageBox_Status.Info = ENUM_MessageBox_Status.Info, duration = 4000) {
    const id = Math.random().toString(36).slice(2);
    const toast: Toast = { id, message, type, duration };
    this._toasts.next([...this._toasts.value, toast]);
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: string) {
    this._toasts.next(this._toasts.value.filter(t => t.id !== id));
  }
}
