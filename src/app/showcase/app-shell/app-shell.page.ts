import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, timer, interval } from 'rxjs';
import { takeUntil, finalize, take } from 'rxjs/operators';

import { ShellProvider } from '../../utils/shell-provider';

// You can use a plain interface as a shell model
// interface IShell {
//   cover: string;
//   image: string;
//   title: string;
//   description: string;
// }

// You can also use a Class object as a shell model
// import { ShowcaseShellModel } from '../showcase-shell.model';

@Component({
  selector: 'app-showcase-shell',
  templateUrl: './app-shell.page.html',
  styleUrls: ['./app-shell.page.scss']
})
export class AppShellPage implements OnInit {
  sampleTextShellData = '';

  // We will manually fetch data using the HttpClient and assign it to this property
  simpleFetchData: {
    cover: string,
    image: string,
    title: string,
    description: string
  };
  // You can also define the type of the property using the IShell interface or the ShowcaseShellModel class
  // simpleFetchData: IShell;
  // simpleFetchData: ShowcaseShellModel;

  // Fetch data with the ShellProvider utility and assign it to this property
  // ShellProvider data is async (Observable)
  shellProviderData: Observable<{
    cover: string,
    image: string,
    title: string,
    description: string
  }>;
  // You can also define the type of the property using the IShell interface or the ShowcaseShellModel class
  // shellProviderData: Observable<IShell>;
  // shellProviderData: Observable<ShowcaseShellModel>;

  // Aux properties for the Simple Fetch (HttpClient) showcase
  simpleFetchButtonDisabled = true;
  simpleFetchCountdown = 0;
  simpleFetchInterval: Observable<any>;

  // Aux properties for the ShellProvider showcase
  shellProviderButtonDisabled = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.showcaseShellSimpleFetch(10);
    this.showcaseShellProvider();
  }

  showcaseShellSimpleFetch(countdown: number): void {
    // Assign an (empty / null) value to the shell object to restore it's 'loading' state
    this.simpleFetchData = null;

    // Prevent rage clicks on the 'Fetch more Data' button
    this.simpleFetchButtonDisabled = true;

    // Start a countdown and an interval before executing the fetch function
    this.simpleFetchCountdown = countdown;
    this.simpleFetchInterval = interval(1000);

    // Start a countdown to showcase the shell elements animations for a few seconds before the data get's fetched into the shell object
    const timer$ = timer(countdown * 1000);
    // When timer emits after X seconds, complete source
    this.simpleFetchInterval
    .pipe(
      takeUntil(timer$),
      finalize(() => this.simpleFetchButtonDisabled = false)
    )
    .subscribe({
      next: () => {
        this.simpleFetchCountdown --;
      },
      complete: () => {
        this.simpleFetchCountdown = 0;
        // Once the countdown ends, fetch data using the HttpClient
        // You can also define the type of the property using the IShell interface or the ShowcaseShellModel class
        // this.http.get<IShell>('./assets/sample-data/showcase/shell.json');
        // this.http.get<ShowcaseShellModel>('./assets/sample-data/showcase/shell.json');
        this.http.get<{
          cover: string,
          image: string,
          title: string,
          description: string
        }>('./assets/sample-data/showcase/shell.json')
        .pipe(
          take(1) // Force Observable to complete
        ).subscribe(val => {
          console.log('Fetching shell data using the HttpClient', val);
          this.simpleFetchData = val;
        });
      }
    });
  }

  showcaseShellProvider(): void {
    // Prevent rage clicks on the 'Fetch more Data' button
    this.shellProviderButtonDisabled = true;

    const shellObject: {
      cover: string,
      image: string,
      title: string,
      description: string
    } = {
      cover: '',
      image: '',
      title: '',
      description: ''
    };

    const shellProvider = new ShellProvider(
      shellObject,
      this.http.get<{
        cover: string,
        image: string,
        title: string,
        description: string
      }>('./assets/sample-data/showcase/shell.json')
      // You can also define the type of the property using the IShell interface or the ShowcaseShellModel class
      // this.http.get<IShell>('./assets/sample-data/showcase/shell.json');
      // this.http.get<ShowcaseShellModel>('./assets/sample-data/showcase/shell.json');
    );

    this.shellProviderData = shellProvider.observable.pipe(
      take(2), // ShellProvider will emit a mock object and the real data fetched from the source. Emit those two values and then complete.
      finalize(() => this.shellProviderButtonDisabled = false)
    );
  }
}
