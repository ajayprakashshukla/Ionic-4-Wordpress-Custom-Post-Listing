import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';

import { ShellProvider } from '../utils/shell-provider';

import { ShowcaseShellModel } from './showcase-shell.model';

@Injectable()
export class ShowcaseService {
  private _dataWithShellCache: ShellProvider<ShowcaseShellModel>;

  constructor(private http: HttpClient) { }

  public getDataWithShell(): Observable<ShowcaseShellModel> {
    // Try to use cache first, so we don't create multiple Observables
    if (!this._dataWithShellCache) {
      // Initialize the model specifying that it is a shell model
      const shellModel: ShowcaseShellModel = new ShowcaseShellModel(true);
      const dataObservable = this.getData();

      const shellProvider = new ShellProvider(
        shellModel,
        dataObservable
      );
      this._dataWithShellCache = shellProvider;
    }

    return this._dataWithShellCache.observable;
  }

  public getData(): Observable<ShowcaseShellModel> {
    const dataObservable = this.http.get<ShowcaseShellModel>('./assets/sample-data/showcase/shell.json').pipe(
      tap(val => {
        console.log('getData STARTED');
        // tslint:disable-next-line:no-console
        console.time('getData Roundtrip');
      }),
      delay(5000),
      finalize(() => {
        console.log('getData COMPLETED');
        // tslint:disable-next-line:no-console
        console.timeEnd('getData Roundtrip');
      })
    );

    return dataObservable;
  }
}
