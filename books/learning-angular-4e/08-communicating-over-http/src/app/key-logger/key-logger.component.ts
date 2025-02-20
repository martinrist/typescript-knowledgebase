import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {filter, fromEvent, map, tap} from "rxjs";

@Component({
  selector: 'app-key-logger',
  templateUrl: './key-logger.component.html',
  styleUrls: ['./key-logger.component.css']
})
export class KeyLoggerComponent implements OnInit {

  @ViewChild('keyContainer', { static: true }) input: ElementRef | undefined;
  keys = '';
  @Input() numeric = false;

  ngOnInit(): void {
    const logger$ = fromEvent<KeyboardEvent>(this.input?.nativeElement,
      'keyup');
    logger$.pipe(
      map(evt => evt.key.charCodeAt(0)),
      filter(code => {
        if (this.numeric) {
          return  !(code > 31 && (code < 48 || code > 57));
        }
        return true;
      }),
      tap(digit => this.keys += String.fromCharCode(digit))
    ).subscribe();
  }

}
