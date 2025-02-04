import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import {CopyrightDirective} from './copyright.directive';
import { APP_SETTINGS, appSettings } from './app.settings';
import {AuthComponent} from './auth/auth.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CopyrightDirective,
    AuthComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
}
