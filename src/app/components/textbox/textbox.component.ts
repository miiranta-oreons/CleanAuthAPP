import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TextboxService } from '../../services/textbox.service';

@Component({
  selector: 'app-textbox',
  imports: [MatSnackBarModule],
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.scss'
})
export class TextboxComponent {
  private textboxService: TextboxService = inject(TextboxService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.textboxService.subscribeTextboxComponent(this);
  }

  openTextbox(text: string[]): void {
    let text_concat = text.join().split('\n').join('\n ');
    this.snackBar.open(text_concat, '', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  openWarningBox(text: string[]): void {
    let text_concat = text.join().split('\n').join('\n ');
    this.snackBar.open(text_concat, '', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
    
  }

}
