import { Injectable } from '@angular/core';
import { TextboxComponent } from '../textbox/textbox.component';

const TEXTBOX_COMPONENT_ERROR = 'TextboxComponent is not initialized. Please subscribe to it first.';

@Injectable({
  providedIn: 'root'
})
export class TextboxService {
  private textboxComponent: TextboxComponent | null = null;
  
  constructor() { }

  openTextbox(text: string[]): void {
    if(!this.textboxComponent) {
      console.error(TEXTBOX_COMPONENT_ERROR);
      return;
    }

    this.textboxComponent.openTextbox(text);
  }

  openWarningBox(text: string[]): void {
    if(!this.textboxComponent) {
      console.error(TEXTBOX_COMPONENT_ERROR);
      return;
    }

    this.textboxComponent.openWarningBox(text);
  }

  subscribeTextboxComponent(component: TextboxComponent): void {
    this.textboxComponent = component;
  }
}
