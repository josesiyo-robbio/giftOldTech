import {Component, inject, OnInit} from '@angular/core';
import {timer} from 'rxjs';
import {Router} from '@angular/router';

import {MyGiftStateService} from '../../services/my-gift-state.service';
import {LoadingDialogComponent} from '../../../shared/loading-dialog/loading-dialog.component';
import {MessageDialogComponent} from '../../../shared/message-dialog/message-dialog.component';

//INTERFACES
import {Person} from '../../interfaces/person';
import {ProductGift} from '../../interfaces/product-gift';

//MATERIAL YOU
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-request-gift-receive-page',
  imports: [
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatButton,
    MatCardSubtitle
  ],
  templateUrl: './request-gift-receive-page.component.html',
  styleUrl: './request-gift-receive-page.component.css'
})



export class RequestGiftReceivePageComponent implements OnInit
{
  //CLASS PROPERTIES
  private dialogRef   :   MatDialogRef<LoadingDialogComponent, any> | undefined;

  public  gift        :   ProductGift | null = null;
  public  dialog      :   MatDialog = inject(MatDialog);
  public persons : Person[] = [
    {
      id    :  1,
      name  : 'sophina richards',
      image : 'https://randomuser.me/api/portraits/women/21.jpg',
      phone : '0123456789'
    },
    {
      id    :  2,
      name  : 'Alejandra richards',
      image : 'https://randomuser.me/api/portraits/women/25.jpg',
      phone : '0123456789'
    },
    {
      id    :  3,
      name  : 'Maria richards',
      image : 'https://randomuser.me/api/portraits/women/31.jpg',
      phone : '0123456789'
    }
  ];



  //CONSTRUCTOR
  constructor(private router: Router, private myGiftStateService: MyGiftStateService ) { }



  //GETTERS & SETTERS (NA)



  //METHODS
  rejectPerson(id: number): void
  {
    this.persons = this.persons.filter(person => person.id !== id);
  }


  acceptButton(giftId : string)
  {
    const newState: boolean = true;
    const gifts  = JSON.parse(localStorage.getItem('myGifts') || '[]');
    const gift : ProductGift = gifts.flat().find((p: { id: string; }) => p.id === giftId);
    if (gift)
    {
      gift.given = newState;
      localStorage.setItem('myGifts', JSON.stringify(gifts));
    }

    this.dialogRef = this.dialog.open(LoadingDialogComponent,
      {
        data: {
          title: 'Please wait...',
        },
        disableClose: true,
      });

    timer(1000).subscribe(() => {
      if (this.dialogRef)
      {
        this.dialogRef.close();
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Success!!!',
          message: 'Thank you for being part of our service',
          onOk: () : void =>
          {
            this.router.navigate(['']);
          }
        },
      });
    });
  }


  givenProduct(id: string) : void
  {
    this.dialog.open(MessageDialogComponent,
      {
        data: {
          title: 'Give a gift?',
          message: 'Are you sure you give this product to this person?',
          onOk: () : void =>
          {
            this.acceptButton(id);
          }
        },
      });
  }



  //LIFECYCLE HOOKS
  ngOnInit(): void
  {
    this.gift = this.myGiftStateService.getGift();
    if(!this.gift)
    {
      this.router.navigate(['']);
    }
    console.log(this.myGiftStateService.getGift());
  }

}
