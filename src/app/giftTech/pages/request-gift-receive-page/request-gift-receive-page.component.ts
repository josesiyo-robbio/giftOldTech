import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardTitle
} from '@angular/material/card';
import {Person} from '../../interfaces/person';
import {MatButton} from '@angular/material/button';
import {MyGiftsService} from '../../services/my-gifts.service';
import {ProductGift} from '../../interfaces/product-gift';
import {Router} from '@angular/router';
import {MyGiftStateService} from '../../services/my-gift-state.service';

@Component({
  selector: 'app-request-gift-receive-page',
  imports: [
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatButton
  ],
  templateUrl: './request-gift-receive-page.component.html',
  styleUrl: './request-gift-receive-page.component.css'
})
export class RequestGiftReceivePageComponent implements OnInit
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
      name : 'Alejandra richards',
      image : 'https://randomuser.me/api/portraits/women/25.jpg',
      phone : '0123456789'
    },
    {
      id :  3,
      name : 'Maria richards',
      image : 'https://randomuser.me/api/portraits/women/31.jpg',
      phone : '0123456789'
    }
  ];


  public  gift           :   ProductGift | null = null;

  constructor(private router: Router, private myGiftStateService: MyGiftStateService ) { }


  rejectPerson(id: number): void {
    this.persons = this.persons.filter(person => person.id !== id);
  }

  ngOnInit(): void
  {
    this.gift = this.myGiftStateService.getGift();
    if(!this.gift){
      this.router.navigate(['']);
    }
    console.log(this.myGiftStateService.getGift());
  }


}
