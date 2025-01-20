import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardTitle
} from '@angular/material/card';
import {Person} from '../../interfaces/person';

@Component({
  selector: 'app-request-gift-receive-page',
  imports: [
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle
  ],
  templateUrl: './request-gift-receive-page.component.html',
  styleUrl: './request-gift-receive-page.component.css'
})
export class RequestGiftReceivePageComponent
{
  giftRequest = {
    name: 'John Doe',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg', // Puedes cambiar esto por una URL de imagen válida
  };

  public persons : Person[] = [
    {
      id :  1,
      name : 'sophina richards',
      image : 'https://randomuser.me/api/portraits/women/21.jpg',
      phone : '0123456789'
    },
    {
      id :  2,
      name : 'sophina richards',
      image : 'https://randomuser.me/api/portraits/women/25.jpg',
      phone : '0123456789'
    },
    {
      id :  3,
      name : 'sophina richards',
      image : 'https://randomuser.me/api/portraits/women/31.jpg',
      phone : '0123456789'
    }
  ];



}
