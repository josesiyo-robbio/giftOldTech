import { Component } from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'giftTech-side-menu',
  imports: [
    MatNavList,
    MatListItem,
    MatIcon,
    RouterLink
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

}
