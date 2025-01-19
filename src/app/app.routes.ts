import { Routes } from '@angular/router';
import {HomePageComponent} from './giftTech/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent : () => import('./giftTech/components/layout/layout.component').then(m => m.LayoutComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
