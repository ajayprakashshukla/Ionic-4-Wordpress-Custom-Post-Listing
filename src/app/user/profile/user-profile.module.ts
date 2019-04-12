import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserProfilePage } from './user-profile.page';
import { UserService } from '../user.service';
import { UserProfileResolver } from './user-profile.resolver';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage,
    resolve: {
      data: UserProfileResolver
    }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UserProfilePage],
  providers: [
    UserProfileResolver,
    UserService
  ]
})
export class UserProfilePageModule {}
