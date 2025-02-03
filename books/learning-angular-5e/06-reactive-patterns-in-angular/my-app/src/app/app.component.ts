import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import {CopyrightDirective} from './copyright.directive';
import { APP_SETTINGS, appSettings } from './app.settings';
import {Observable} from 'rxjs';
import {KeyLoggerComponent} from './key-logger/key-logger.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProductListComponent,
    CopyrightDirective,
    KeyLoggerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: APP_SETTINGS, useValue: appSettings }
  ]
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
  title = 'World';

  title$ = new Observable(observer => {
    setInterval(() => {
      observer.next();
    }, 2000);
  });

  constructor() {
    this.title$.subscribe(this.setTitle);
  }

  private setTitle = () => {
    const timestamp = new Date();
    this.title = `${this.settings.title} ${timestamp}`;
  }

  private onComplete() {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
      }, 2000);
    });
  }
}
