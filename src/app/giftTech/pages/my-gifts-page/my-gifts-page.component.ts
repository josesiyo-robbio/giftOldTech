import {Component, OnDestroy, OnInit} from '@angular/core';
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
  private myGiftSubscription = new Subscription();
  public myGifts : ProductGift[] = [];
  public  pageToolTip : string = `Here you can see all the devices you've made available for gifting.
   In this section, you can manage your listings, review the products you've uploaded,
    and see who is interested in them. If you have more devices to share,
     you can easily add them to your list and help others give them a second life.`;


  public pageSize: number = 5
  public pageSizeOptions: number[] = [5, 10, 20];
  currentPage: number = 0;


  //CONSTRUCTOR
  public totalItems: number =0;
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
          this.totalItems = data.length;
          console.log(this.totalItems);
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

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedGifts(): ProductGift[] {
    const start = this.currentPage * this.pageSize;  // Calcula el índice inicial de la página
    return this.myGifts.slice(start, start + this.pageSize);  // Aplica la paginación sobre el array completo
  }

}
