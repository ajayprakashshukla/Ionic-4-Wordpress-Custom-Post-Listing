import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadChildren: '../my-sports-feeds/my-sports-feeds.module#MySportsFeedsPageModule'
          },
          {
            path: 'sportfeed',
            loadChildren: '../my-sports-feeds/my-sports-feeds.module#MySportsFeedsPageModule'
          },
          {
            path: 'singlefeed/:id',
            loadChildren: '../singlefeed/singlefeed.module#SinglefeedPageModule'
          }

         
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: '../user/profile/user-profile.module#UserProfilePageModule'
          },
          {
            path: 'friends',
            loadChildren: '../user/friends/user-friends.module#UserFriendsPageModule'
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: '../notifications/notifications.module#NotificationsPageModule'
          }
        ]
      },
      {
        path: 'video',
        children: [
          {
            path: '',
            loadChildren: '../videos/videos.module#VideosPageModule'
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: '../search/search.module#SearchPageModule'
          }
        ]
      },
      {
        path: 'message',
        children: [
          {
            path: '',
            loadChildren: '../messages/messages.module#MessagesPageModule'
          }
        ]
      }
    ]
  },
  // /app/ redirect
  {
    path: '',
    redirectTo: 'app/categories',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [ ]
})
export class TabsPageRoutingModule {}
