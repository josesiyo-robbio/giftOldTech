import { Injectable } from '@angular/core';
import {ProductGift} from '../interfaces/product-gift';

@Injectable({
  providedIn: 'root'
})
export class MyGiftStateService
{
  private selectedGift: ProductGift | null = null;
  constructor() { }

  setGift(gift: ProductGift): void {
    this.selectedGift = gift;
  }

  getGift(): ProductGift | null
  {
    return this.selectedGift;
  }
}
