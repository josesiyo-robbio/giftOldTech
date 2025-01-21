import { Injectable } from '@angular/core';
import {ProductGift} from '../interfaces/product-gift';



@Injectable({
  providedIn: 'root'
})
export class MyGiftStateService
{
  //CLASS PROPERTIES
  private selectedGift: ProductGift | null = null;



  //CONSTRUCTOR
  constructor() { }



  //GETTERS & SETTERS
  setGift(gift: ProductGift): void
  {
    this.selectedGift = gift;
  }

  getGift(): ProductGift | null
  {
    return this.selectedGift;
  }



  //METHODS (NA)



  //LIFECYCLE HOOKS (NA)

}
