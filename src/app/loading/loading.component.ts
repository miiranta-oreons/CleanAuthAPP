import { Component, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule, NgStyle],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  protected loadingHappening = signal(false);

  protected loadingElementOpacity = signal(0);

  async openLoading(): Promise<void> {
    this.loadingHappening.set(true);

    for (let i = 0; i <= 80; i++) {
      this.loadingElementOpacity.set(i*0.01);
      await new Promise(resolve => setTimeout(resolve, 1));
    }
  }

  async closeLoading(): Promise<void> {

    for (let i = 80; i > 0; i--) {
      this.loadingElementOpacity.set(i*0.01);
      await new Promise(resolve => setTimeout(resolve, 1));
    }

    this.loadingHappening.set(false);
  }

}
