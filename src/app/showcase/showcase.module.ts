import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';

const showcaseRoutes: Routes = [
  {
    path: 'app-shell',
    loadChildren: './app-shell/app-shell.module#AppShellModule'
  },
  {
    path: 'custom-components',
    loadChildren: './custom-components/custom-components.module#CustomComponentsModule'
  },
  {
    path: 'route-resolvers-ux',
    loadChildren: './route-resolvers-ux/route-resolvers-ux.module#RouteResolversUXModule'
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(showcaseRoutes),
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [ ]
})
export class ShowcasePageModule {}
