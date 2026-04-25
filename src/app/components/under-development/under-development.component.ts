import { Component } from '@angular/core';

@Component({
  selector: 'app-under-development',
  standalone: false,
  templateUrl: './under-development.component.html',
  styleUrl:'./under-development.component.css'
})
export class UnderDevelopmentComponent {
  Email = '';
  ShowToast = false;
  private _toastTimer: any;

  OnNotify() {
    if (!this.Email || !this.Email.includes('@')) {
      return;
    }
    this.Email = '';
    clearTimeout(this._toastTimer);
    this.ShowToast = true;
    this._toastTimer = setTimeout(() => {
      this.ShowToast = false;
    }, 3000);
  }
}