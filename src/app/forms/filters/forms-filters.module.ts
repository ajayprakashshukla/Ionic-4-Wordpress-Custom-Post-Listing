import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// TODO: move to a shared module instead
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';
import { FormsFiltersPage } from './forms-filters.page';

const routes: Routes = [
  {
    path: '',
    component: FormsFiltersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [FormsFiltersPage]
})
export class FormsFiltersPageModule {}
