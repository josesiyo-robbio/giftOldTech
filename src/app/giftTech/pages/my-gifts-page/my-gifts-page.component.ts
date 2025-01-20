import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {ProductGift} from '../../interfaces/product-gift';
import {MyGiftsService} from '../../services/my-gifts.service';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {MyGiftStateService} from '../../services/my-gift-state.service';
import {MatChip} from '@angular/material/chips';

@Component({
  selector: 'giftTech-my-gifts-page',
  imports: [
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatCardSubtitle,
    MatButton,
    MatChip
  ],
  templateUrl: './my-gifts-page.component.html',
  styleUrl: './my-gifts-page.component.css'
})
export class MyGiftsPageComponent
{
  //CLASS PROPERTIES
  private myGiftSubscription = new Subscription();
  public myGifts : ProductGift[] = [];
  public  pageToolTip : string = `Here you can see all the devices you've made available for gifting.
   In this section, you can manage your listings, review the products you've uploaded,
    and see who is interested in them. If you have more devices to share,
     you can easily add them to your list and help others give them a second life.`

    //CONSTRUCTOR
  constructor(
    private myGiftsService: MyGiftsService,
    private myGiftStateService: MyGiftStateService,
    private router: Router
  )
  {
    this.myGiftSubscription = new Subscription();
  }

  ngOnInit(): void

  {
    this.myGiftSubscription = this.myGiftsService.getProducts().subscribe(
      (data) => {
        if (data && Array.isArray(data))
        {
          this.myGifts = data;
        }
        else
        {
          console.warn('No se encontraron productos válidos.');
          this.myGifts = [];
        }
      },
      (error) => {
        console.error('Error al cargar productos:', error);
        this.myGifts = [];
      }
    )
  }


  ngOnDestroy(): void
  {
    if (this.myGiftSubscription)
    {
      this.myGiftSubscription.unsubscribe();
    }
  }


  toInboxRequest(gift : ProductGift) :void
  {
    this.myGiftStateService.setGift(gift);
    this.router.navigate(['/inbox-request']);



  }
}
