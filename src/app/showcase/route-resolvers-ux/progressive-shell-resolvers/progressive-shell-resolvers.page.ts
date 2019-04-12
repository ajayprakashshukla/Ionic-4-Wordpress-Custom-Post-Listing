import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// You can also use a Class object as a shell model
import { ShowcaseShellModel } from '../../showcase-shell.model';

@Component({
  selector: 'app-showcase-progressive-shell-resolvers',
  templateUrl: './progressive-shell-resolvers.page.html',
  styleUrls: ['./progressive-shell-resolvers.page.scss']
})
export class ProgressiveShellResovlersPage implements OnInit {
  // We will assign data coming from the Route Resolver to this property
  routeResolveData: ShowcaseShellModel;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('Showcase Progressive Shell Resovlers - ngOnInit()');

    if (this.route && this.route.data) {
      // We resolved a promise for the data Observable
      const promiseObservable = this.route.data;
      console.log('Showcase Progressive Shell Resovlers - Route Resolve Observable => promiseObservable: ', promiseObservable);

      if (promiseObservable) {
        promiseObservable.subscribe(promiseValue => {
          const dataObservable = promiseValue['data'];
          console.log('Showcase Progressive Shell Resovlers - Subscribe to promiseObservable => dataObservable: ', dataObservable);

          if (dataObservable) {
            dataObservable.subscribe(observableValue => {
              const pageData: ShowcaseShellModel = observableValue;
              // tslint:disable-next-line:max-line-length
              console.log('Showcase Progressive Shell Resovlers - Subscribe to dataObservable (can emmit multiple values) => PageData (' + ((pageData && pageData.isShell) ? 'SHELL' : 'REAL') + '): ', pageData);
              // As we are implementing an App Shell architecture, pageData will be firstly an empty shell model,
              // and the real remote data once it gets fetched
              if (pageData) {
                this.routeResolveData = pageData;
              }
            });
          } else {
            console.warn('No dataObservable coming from Route Resolver promiseObservable');
          }
        });
      } else {
        console.warn('No promiseObservable coming from Route Resolver data');
      }
    } else {
      console.warn('No data coming from Route Resolver');
    }
  }
}
