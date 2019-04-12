import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ShowcaseService } from '../../showcase.service';

@Injectable()
export class ProgressiveShellResolver implements Resolve<any> {

  constructor(
    private showcaseService: ShowcaseService
  ) {}

  resolve() {
    // Get the Shell Provider from the service
    const shellProviderObservable = this.showcaseService.getDataWithShell();

    // Resolve with Shell Provider
    const observablePromise = new Promise((resolve, reject) => {
      resolve(shellProviderObservable);
    });
    return observablePromise;
  }
}
