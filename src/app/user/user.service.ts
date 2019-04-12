import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ShellProvider } from '../utils/shell-provider';

import { UserProfileModel } from './profile/user-profile.model';
import { UserFriendsModel } from './friends/user-friends.model';

@Injectable()
export class UserService {
  private _profileDataWithShellCache: ShellProvider<UserProfileModel>;
  private _friendsDataWithShellCache: ShellProvider<UserFriendsModel>;

  constructor(private http: HttpClient) { }

  public getProfileDataWithShell(): Observable<UserProfileModel> {
    // Use cache if we have it.
    if (!this._profileDataWithShellCache) {
      // Initialize the model specifying that it is a shell model
      const shellModel: UserProfileModel = new UserProfileModel(true);
      const dataObservable = this.http.get<UserProfileModel>('./assets/sample-data/user/user-profile.json');

      this._profileDataWithShellCache = new ShellProvider(
        shellModel,
        dataObservable
      );
    }
    return this._profileDataWithShellCache.observable;
  }

  public getFriendsDataWithShell(): Observable<UserFriendsModel> {
    // Use cache if we have it.
    if (!this._friendsDataWithShellCache) {
      // Initialize the model specifying that it is a shell model
      const shellModel: UserFriendsModel = new UserFriendsModel(true);
      const dataObservable = this.http.get<UserFriendsModel>('./assets/sample-data/user/user-friends.json');

      this._friendsDataWithShellCache = new ShellProvider(
        shellModel,
        dataObservable
      );
    }
    return this._friendsDataWithShellCache.observable;
  }

}
