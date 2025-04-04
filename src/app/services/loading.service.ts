import { Injectable } from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';

const LOADING_COMPONENT_ERROR = 'LoadingComponent is not initialized. Please subscribe to it first.';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingComponent: LoadingComponent | null = null;

  constructor() { }

  openLoading(): void {
    if (!this.loadingComponent) {
      console.error(LOADING_COMPONENT_ERROR);
      return;
    }

    this.loadingComponent.openLoading();
  }

  closeLoading(): void {
    if (!this.loadingComponent) {
      console.error(LOADING_COMPONENT_ERROR);
      return;
    }

    this.loadingComponent.closeLoading();
  }

  subscribeLoadingComponent(component: LoadingComponent): void {
    this.loadingComponent = component;
  }
}
