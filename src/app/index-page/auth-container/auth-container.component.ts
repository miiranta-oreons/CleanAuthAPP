import { Component, signal } from '@angular/core';
import { BackgroundAnimationComponent } from "./background-animation/background-animation.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegisterFormComponent } from "./register-form/register-form.component";

@Component({
  selector: 'app-auth-container',
  imports: [BackgroundAnimationComponent, LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss'
})
export class AuthContainerComponent {
  public displayRegisterForm = signal(true);
}
