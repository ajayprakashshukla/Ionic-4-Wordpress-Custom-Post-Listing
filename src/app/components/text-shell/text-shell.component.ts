import { Component, Input, HostBinding } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-text-shell',
  templateUrl: './text-shell.component.html',
  styleUrls: [
    './text-shell.component.scss'
  ]
})
export class TextShellComponent {
  // To debug shell styles, change configuration in the environment.ts file
  private debugMode = (environment && environment.shell && environment.shell.debug) ? environment.shell.debug : false;

  _data: '';

  @HostBinding('class.text-loaded') textLoaded = false;

  @Input() set data(val: any) {
    if (!this.debugMode) {
      this._data = (val !== undefined && val !== null) ? val : '';
    }

    if (this._data && this._data !== '') {
      this.textLoaded = true;
    } else {
      this.textLoaded = false;
    }
  }

  constructor() { }
}
