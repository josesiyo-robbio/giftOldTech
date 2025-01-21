import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import {ProductGift} from '../../interfaces/product-gift';
import {MyGiftsService} from '../../services/my-gifts.service';
import {MyGiftStateService} from '../../services/my-gift-state.service';

//MATERIAL YOU
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatChip} from '@angular/material/chips';
import {MatPaginator, PageEvent} from '@angular/material/paginator';


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
    MatChip,
    MatPaginator
  ],
  templateUrl: './my-gifts-page.component.html',
  styleUrl: './my-gifts-page.component.css'
})
export class MyGiftsPageComponent implements OnInit, OnDestroy
{
  //CLASS PROPERTIES
  private myGiftSubscription : Subscription = new Subscription();
  public myGifts : ProductGift[] = [];
  public  pageToolTip : string = `Here you can see all the devices you've made available for gifting.
    In this section, you can manage your listings, review the products you've uploaded,
    and see who is interested in them. If you have more devices to share,
    you can easily add them to your list and help others give them a second life.`;

  public pageSize: number = 5
  public pageSizeOptions: number[] = [5, 10, 20];
  currentPage: number = 0;
  public totalItems: number =0;



  //CONSTRUCTOR
  constructor
  (
    private myGiftsService: MyGiftsService,
    private myGiftStateService: MyGiftStateService,
    private router: Router
  ) { this.myGiftSubscription = new Subscription(); }



  //GETTERS & SETTERS
  get paginatedGifts(): ProductGift[]
  {
    const start : number = this.currentPage * this.pageSize;
    return this.myGifts.slice(start, start + this.pageSize);
  }



  //METHODS
  toInboxRequest(gift : ProductGift) :void
  {
    this.myGiftStateService.setGift(gift);
    this.router.navigate(['/inbox-request']);
  }


  onPageChange(event: PageEvent) : void
  {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }



  //LIFECYCLE HOOKS
  ngOnInit(): void
  {
    this.myGiftSubscription = this.myGiftsService.getProducts().subscribe(
      (data: ProductGift[]) : void => {
        if (data && Array.isArray(data))
        {
          this.myGifts = data;
          this.totalItems = data.length;
        }
        else
        {
          this.myGifts = [];
        }
      },
      (error) => {
        console.error( error);
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

}
