import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserFriendsModel } from './user-friends.model';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.page.html',
  styleUrls: [
    './styles/user-friends.page.scss',
    './styles/user-friends.shell.scss',
    './styles/user-friends.md.scss'
  ]
})
export class UserFriendsPage implements OnInit {
  data: UserFriendsModel;

  segmentValue = 'friends';
  friendsList: Array<any>;
  followersList: Array<any>;
  followingList: Array<any>;
  searchQuery = '';
  showFilters = false;

  @HostBinding('class.is-shell') get isShell() {
    return (this.data && this.data.isShell) ? true : false;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route && this.route.data) {
      // We resolved a promise for the data Observable
      const promiseObservable = this.route.data;
      console.log('Route Resolve Observable => promiseObservable: ', promiseObservable);

      if (promiseObservable) {
        promiseObservable.subscribe(promiseValue => {
          const dataObservable = promiseValue['data'];
          console.log('Subscribe to promiseObservable => dataObservable: ', dataObservable);

          if (dataObservable) {
            dataObservable.subscribe(observableValue => {
              const pageData: UserFriendsModel = observableValue;
              // tslint:disable-next-line:max-line-length
              console.log('Subscribe to dataObservable (can emmit multiple values) => PageData (' + ((pageData && pageData.isShell) ? 'SHELL' : 'REAL') + '): ', pageData);
              // As we are implementing an App Shell architecture, pageData will be firstly an empty shell model,
              // and the real remote data once it gets fetched
              if (pageData) {
                this.data = pageData;
                this.friendsList = this.data.friends;
                this.followersList = this.data.followers;
                this.followingList = this.data.following;
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

  segmentChanged(ev): void {
    this.segmentValue = ev.detail.value;

    // Check if there's any filter and apply it
    this.searchList();
  }

  searchList(): void {
    const query = (this.searchQuery && this.searchQuery !== null) ? this.searchQuery : '';

    if (this.segmentValue === 'friends') {
      this.friendsList = this.filterList(this.data.friends, query);
    } else if (this.segmentValue === 'followers') {
      this.followersList = this.filterList(this.data.followers, query);
    } else if (this.segmentValue === 'following') {
      this.followingList = this.filterList(this.data.following, query);
    }
  }

  filterList(list, query): Array<any> {
    return list.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  }
}
