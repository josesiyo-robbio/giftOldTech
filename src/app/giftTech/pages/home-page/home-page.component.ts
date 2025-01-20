import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Subscription, timer} from 'rxjs';
import {PeopleGiftService} from '../../services/peopleGift.service';
import {Category, ProductGift} from '../../interfaces/product-gift';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatExpansionPanelActionRow} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MessageDialogComponent} from '../../../shared/message-dialog/message-dialog.component';
import {LoadingDialogComponent} from '../../../shared/loading-dialog/loading-dialog.component';
import {Router} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
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
    MatExpansionPanelActionRow,
    MatIcon,
    MatProgressSpinner,
    MatChip
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy
{

  //CLASS PROPERTIES
  private peopleGiftSubscription = new Subscription();
  public dialog :MatDialog = inject(MatDialog);
  private dialogRef         :   MatDialogRef<LoadingDialogComponent, any> | undefined;
  isLoading = signal<boolean>(true);

  /*public peopleGifts : ProductGift[] = [];*/
  peopleGifts = signal<ProductGift[]>([]);

  /*selectedCategory : string = '';*/
  selectedCategory = signal<string | null>(null);

  categories: Category[] = Object.values(Category);

  //filtering
  filteredGifts = computed(() => {
    if(!this.selectedCategory() || this.selectedCategory() === 'None')
    {
      return this.peopleGifts();
    }
    return this.peopleGifts().filter(gift => gift.category === this.selectedCategory());
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
