import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {RouterOutlet} from '@angular/router';
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
export class LayoutComponent {

}
