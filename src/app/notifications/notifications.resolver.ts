import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { NotificationsService } from './notifications.service';

@Injectable()
export class NotificationsResolver implements Resolve<any> {

  constructor(private notificationsService: NotificationsService) { }

  resolve() {
    // Base Observable (where we get data from)
    const dataObservable = this.notificationsService.getData();

    // Resolver using a Promise that resolves the base Observable
    const observablePromise = new Promise((resolve, reject) => {
      resolve(dataObservable);
    });

    return observablePromise;
  }
}
