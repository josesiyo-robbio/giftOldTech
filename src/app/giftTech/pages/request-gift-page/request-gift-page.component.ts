import {Component, computed, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {Router} from '@angular/router';

import {LoadingDialogComponent} from '../../../shared/loading-dialog/loading-dialog.component';
import {Category, ProductGift} from '../../interfaces/product-gift';
import {PeopleGiftService} from '../../services/peopleGift.service';
import {MessageDialogComponent} from '../../../shared/message-dialog/message-dialog.component';
import {GiftAnimationComponent} from '../../components/gift-animation/gift-animation.component';

//MATERIAL YOU
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatButton} from '@angular/material/button';
import {MatChip} from '@angular/material/chips';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-request-gift-page',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatChip,
    GiftAnimationComponent,
    MatCardSubtitle,
    MatPaginator
  ],
  templateUrl: './request-gift-page.component.html',
  styleUrl: './request-gift-page.component.css'
})
export class RequestGiftPageComponent implements OnInit, OnDestroy
{
  //CLASS PROPERTIES
  public    dialog                  :   MatDialog = inject(MatDialog);
  public    isLoading               :   WritableSignal<boolean> = signal<boolean>(true);
  public    pageToolTip             :   string = `On this page, you can see the requests you've sent to receive devices.
    Here, you can manage your requests and track the products you're interested in. If a request is
    accepted, you'll be able to take the device and give it a new life.`;
  public pageSize           : number = 5;
  public pageSizeOptions    : number[] = [5, 10, 20];
  public currentPage        : number =  0;
  public totalItems         : number =  0;

  private   peopleGifts :WritableSignal<ProductGift[]> = signal<ProductGift[]>([]);
  private   selectedCategory : WritableSignal<string | null> = signal<string | null>(null);
  private   categories: Category[] = Object.values(Category);
  private   peopleGiftSubscription  :   Subscription = new Subscription();
  private   dialogRef               :   MatDialogRef<LoadingDialogComponent, any> | undefined;

  //filtering
  filteredGifts = computed(() => {
    return this.peopleGifts().filter(gift => gift.claimed);
  });



  //CONSTRUCTOR
  constructor(private peopleGiftService: PeopleGiftService, private router: Router)
  {
    this.peopleGiftSubscription = new Subscription();
  }



  //GETTERS & SETTERS
  get paginatedGifts(): ProductGift[]
  {
    const filtered : ProductGift[] = this.filteredGifts();
    const start : number = this.currentPage * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }



  //METHODS
  updateCategory(category: string): void
  {
    this.selectedCategory.set(category);
  }


  claimGift(id : string): void
  {
    this.dialog.open(MessageDialogComponent,
      {
        data: {
          title: 'Send Request',
          message: 'Are you sure you want to submit a request to claim the gift?',
          onOk: () : void =>
          {
            this.openDialog(id);
          }
        },
      });
  }


  public openDialog(gifttId: string)
  {
    const newState: boolean = true;
    const gifts  = JSON.parse(localStorage.getItem('peopleGifts') || '[]');
    const gift : ProductGift = gifts.flat().find((p: { id: string; }) => p.id === gifttId);
    if (gift)
    {
      gift.claimed = newState;
      localStorage.setItem('peopleGifts', JSON.stringify(gifts));
    }
    this.dialogRef = this.dialog.open(LoadingDialogComponent,
      {
        data: {
          title: 'Sending request...',
        },
        disableClose: true,
      });

    timer(1000).subscribe(() => {
      if (this.dialogRef)
      {
        this.dialogRef.close();
      }
    });

    this.dialogRef.afterClosed().subscribe(result =>
    {
      this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Success!!!',
          message: 'The request has been submitted, please stay tuned for the response.',
          onOk: () =>
          {
            this.router.navigate(['/my-profile']);
          }
        },
      });
    });
  }


  onPageChange(event: PageEvent) : void
  {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }



  //LIFECYCLE HOOKS
  ngOnInit(): void
  {
    this.isLoading.set(true);
    this.peopleGiftSubscription = this.peopleGiftService.getProducts().subscribe({
      next: (data : ProductGift[]) : void => {
        if (data && Array.isArray(data))
        {
          this.peopleGifts.set(data);
          this.totalItems = data.length;
        }
        else
        {
          this.peopleGifts.set([]);
        }
        this.isLoading.set(false);
      },
      error: (error) : void =>
      {
        this.peopleGifts.set([]);
        this.isLoading.set(false);
      }
    });
  }


  ngOnDestroy(): void
  {
    if (this.peopleGiftSubscription)
    {
      this.peopleGiftSubscription.unsubscribe();
    }
  }

}
