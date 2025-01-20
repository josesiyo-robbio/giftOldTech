import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {MatChip} from '@angular/material/chips';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatSelect} from '@angular/material/select';
import {Subscription, timer} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoadingDialogComponent} from '../../../shared/loading-dialog/loading-dialog.component';
import {Category, ProductGift} from '../../interfaces/product-gift';
import {PeopleGiftService} from '../../services/peopleGift.service';
import {Router} from '@angular/router';
import {MessageDialogComponent} from '../../../shared/message-dialog/message-dialog.component';
import {GiftAnimationComponent} from '../../components/gift-animation/gift-animation.component';

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
    MatFormField,
    MatLabel,
    MatOption,
    MatProgressSpinner,
    MatSelect,
    GiftAnimationComponent,
    MatCardSubtitle
  ],
  templateUrl: './request-gift-page.component.html',
  styleUrl: './request-gift-page.component.css'
})
export class RequestGiftPageComponent implements OnInit, OnDestroy
{
  //CLASS PROPERTIES
  private peopleGiftSubscription = new Subscription();
  public dialog :MatDialog = inject(MatDialog);
  private dialogRef         :   MatDialogRef<LoadingDialogComponent, any> | undefined;
  isLoading = signal<boolean>(true);
  public  pageToolTip : string = `On this page, you can see the requests you've sent to receive devices.
   Here, you can manage your requests and track the products you're interested in. If a request is
    accepted, you'll be able to take the device and give it a new life.`;

    /*public peopleGifts : ProductGift[] = [];*/
  peopleGifts = signal<ProductGift[]>([]);

  /*selectedCategory : string = '';*/
  selectedCategory = signal<string | null>(null);

  categories: Category[] = Object.values(Category);

  //filtering
  filteredGifts = computed(() => {

    return this.peopleGifts().filter(gift => gift.claimed);
  });


  updateCategory(category: string) {
    this.selectedCategory.set(category);
  }

  //CONSTRUCTOR
  constructor(private peopleGiftService: PeopleGiftService, private router: Router)
  {
    this.peopleGiftSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.isLoading.set(true);
    this.peopleGiftSubscription = this.peopleGiftService.getProducts().subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          this.peopleGifts.set(data);
        } else {
          console.warn('No se encontraron productos válidos.');
          this.peopleGifts.set([]);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
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


  claimGift(id : string)
  {
    this.dialog.open(MessageDialogComponent,
      {
        data: {
          title: 'Send Request',
          message: 'Are you sure you want to submit a request to claim the gift?',
          onOk: () =>
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


}
