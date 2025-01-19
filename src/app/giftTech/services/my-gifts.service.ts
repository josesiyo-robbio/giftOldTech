import { Injectable } from '@angular/core';
import {Category, Condition, ProductGift} from '../interfaces/product-gift';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyGiftsService
{
  //CLASS PROPERTIES
  private myGifts: ProductGift[] =
    [
      {
        id: '1',
        name: 'PlayStation Vita Slim',
        image: 'https://4.bp.blogspot.com/-tJX1yBJFs7U/VGojSDsmfAI/AAAAAAAAXBo/H3AFaRK0LNg/s1600/4948872413947-02.jpg',
        description: `Lightly used PlayStation Vita Slim in excellent condition. The OLED screen provides stunning
      visuals with no scratches or dead pixels. The console has been well taken care of, showing only minimal
      signs of use. Includes the original charger and a protective case. Perfect for gaming on the go, whether
      you're a fan of RPGs, action games, or indie hits.`,
        given : false,
        category : Category.Videogames,
        condition : Condition.LikeNew
      },
      {
        id: '2',
        name: 'Nintendo Switch OLED',
        image: 'https://www.nme.com/wp-content/uploads/2021/11/Nintendo-Switch-OLED-featured-2000x1270-1-1392x884.jpg',
        description: `Used Nintendo Switch OLED in fantastic condition. The vibrant OLED screen is free of scratches
      and delivers a stunning gaming experience. Joy-cons are fully functional with no drift issues.
      This console has been gently used and comes with the original box, dock, and power adapter.
      Perfect for both handheld and docked gaming sessions.`,
        given : false,
        category : Category.Videogames,
        condition : Condition.Broken
      }
  ];


  //CONSTRUCTOR
  constructor()
  {
    this.loadProducts();
  }



  //GETTERS & SETTERS (NA)



  //METHODS
  private loadProducts()
  {
    const storedProducts = localStorage.getItem('myGifts');
    if(!storedProducts)
    {
      localStorage.setItem('myGifts', JSON.stringify([this.myGifts]));
    }
  }


  public getProducts(): Observable<ProductGift[]>
  {
    const storedProducts = localStorage.getItem('myGifts');
    try
    {
      const parsedProducts = storedProducts ? JSON.parse(storedProducts) : [];
      return of(Array.isArray(parsedProducts[0]) ? parsedProducts[0] : parsedProducts);
    }
    catch (error)
    {
      console.error('Error al parsear los productos desde localStorage:', error);
      return of([]);
    }
  }
}
