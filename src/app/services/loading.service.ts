import { Injectable } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';

const LOADING_COMPONENT_ERROR = 'LoadingComponent is not initialized. Please subscribe to it first.';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingComponent: LoadingComponent | null = null;

  constructor() { }

  openLoading(text: string): void {
    if (!this.loadingComponent) {
      console.error(LOADING_COMPONENT_ERROR);
      return;
    }

    this.loadingComponent.openLoading(text);
  }

  closeLoading(): void {
    if (!this.loadingComponent) {
      console.error(LOADING_COMPONENT_ERROR);
      return;
    }

    this.loadingComponent.closeLoading();
  }

  subscribeLoadingCComponent(component: LoadingComponent): void {
    this.loadingComponent = component;
  }
}
