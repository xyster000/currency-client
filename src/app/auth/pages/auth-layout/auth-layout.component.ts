import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  template: `
    <div class="auth-layout">
      <div class="auth-container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .auth-layout {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fafafa;
    }

    .auth-container {
      width: 100%;
      max-width: 440px;
      padding: 16px;
      box-sizing: border-box;
    }
  `]
})
export class AuthLayoutComponent { }
