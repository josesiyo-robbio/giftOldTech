import {Component, computed, inject, OnDestroy, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {Router} from '@angular/router';

import {PeopleGiftService} from '../../services/peopleGift.service';
import {Category, ProductGift} from '../../interfaces/product-gift';
import {MessageDialogComponent} from '../../../shared/message-dialog/message-dialog.component';
import {LoadingDialogComponent} from '../../../shared/loading-dialog/loading-dialog.component';
import {GiftAnimationComponent} from '../../components/gift-animation/gift-animation.component';

//MATERIAL YOU
import {
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from '@angular/material/card';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatChip} from '@angular/material/chips';


@Component({
  selector: 'giftTech-home-page',
  imports: [
    MatCardModule,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatFormField,
    MatChip,
    GiftAnimationComponent,
    MatPaginator
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy
{

  //CLASS PROPERTIES
  public  pageToolTip : string = `On this page, you can explore the devices available for gifting. Here, you'll find
   a list of products that others have made available to give them a second life. If you see something you're interested
    in, you can easily take it. Browse through the options and find the device you need or one that could be useful to you.`;
  private peopleGiftSubscription = new Subscription();
  public dialog :MatDialog = inject(MatDialog);
  private dialogRef         :   MatDialogRef<LoadingDialogComponent, any> | undefined;
  isLoading : WritableSignal<boolean> = signal<boolean>(true);
  public pageSize: number = 6;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [5, 10, 20];
  currentPage: number = 0;

  peopleGifts : WritableSignal<ProductGift[]> = signal<ProductGift[]>([]);
  selectedCategory : WritableSignal<string | null> = signal<string | null>(null);
  categories: Category[] = Object.values(Category);



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
  filteredGifts : Signal<ProductGift[]>   = computed(() : ProductGift[] => {
    if(!this.selectedCategory() || this.selectedCategory() === 'None')
    {
      return this.peopleGifts();
    }
    return this.peopleGifts().filter(gift => gift.category === this.selectedCategory());
  });


  updateCategory(category: string) : void
  {
    this.selectedCategory.set(category);
  }


  claimGift(id : string) : void
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


  public openDialog(gifttId: string) : void
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

    timer(1000).subscribe(() : void => {
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
          onOk: () : void =>
          {
            this.router.navigate(['/requests']);
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
      next: (data: ProductGift[]) : void => {
        if (data && Array.isArray(data))
        {
          this.peopleGifts.set(data);
        }
        else
        {
          this.peopleGifts.set([]);
        }
        this.isLoading.set(false);
      },
      error: (error) : void => {
        console.error('Error al cargar productos:', error);
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
