import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';

import { AppShellPage } from './app-shell.page';
import { ShowcaseService } from '../showcase.service';

const routes: Routes = [
  {
    path: '',
    component: AppShellPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [
    AppShellPage
  ],
  providers: [
    ShowcaseService
  ]
})
export class AppShellModule {}
