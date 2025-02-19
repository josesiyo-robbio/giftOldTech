import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import {RouterOutlet, Routes} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {SideMenuComponent} from '../side-menu/side-menu.component';


@Component({
  selector: 'app-layout',
  imports: [
    MatDrawerContainer,
    MatToolbarModule,
    MatIconModule,
    RouterOutlet,
    MatIconButton,
    MatDrawer,
    MatSidenavModule,
    SideMenuComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent
{
  static routes: Routes = [
    { path: 'home', loadComponent : () => import('../../pages/home-page/home-page.component').then(m => m.HomePageComponent),},
    {path : 'my-gifts', loadComponent : () => import('../../pages/my-gifts-page/my-gifts-page.component').then(m => m.MyGiftsPageComponent),},
    {path : 'my-profile', loadComponent : () =>import('../../pages/my-profile-page/my-profile-page.component').then(m => m.MyProfilePageComponent),},
    {path : 'add-gift', loadComponent: ( ) => import('../../pages/add-gift-page/add-gift-page.component').then(m => m.AddGiftPageComponent),},
    {path : 'requests',loadComponent:() => import('../../pages/request-gift-page/request-gift-page.component').then(m => m.RequestGiftPageComponent),},
    {path : 'inbox-request', loadComponent:() => import('../../pages/request-gift-receive-page/request-gift-receive-page.component').then(m => m.RequestGiftReceivePageComponent),},
    { path: '**', redirectTo: 'home' },

  ]

}
