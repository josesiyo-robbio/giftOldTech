import { Routes } from '@angular/router';
import {LayoutComponent} from './giftTech/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent : () => import('./giftTech/components/layout/layout.component').then(m => m.LayoutComponent),
    children: LayoutComponent.routes
  },

  {
    path: '**',
    redirectTo: 'home',
  }
];
