import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Subscription} from 'rxjs';
import {PeopleGiftService} from '../../services/peopleGift.service';
import {ProductGift} from '../../interfaces/product-gift';

@Component({
  selector: 'giftTech-home-page',
  imports: [
    MatCardModule,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy
{

  //CLASS PROPERTIES
  private peopleGiftSubscription = new Subscription();
  public peopleGifts : ProductGift[] = [];

  //CONSTRUCTOR
  constructor(private peopleGiftService: PeopleGiftService)
  {
    this.peopleGiftSubscription = new Subscription();
  }

  ngOnInit(): void
  {
    this.peopleGiftSubscription = this.peopleGiftService.getProducts().subscribe(
      (data) => {
        if (data && Array.isArray(data))
        {
          this.peopleGifts = data;
        }
        else
        {
          console.warn('No se encontraron productos válidos.');
          this.peopleGifts = [];
        }
      },
      (error) => {
        console.error('Error al cargar productos:', error);
        this.peopleGifts = [];
      }
    )
  }


  ngOnDestroy(): void
  {
    if (this.peopleGiftSubscription)
    {
      this.peopleGiftSubscription.unsubscribe();
    }
  }


}
