import {Component, computed, OnDestroy, OnInit, signal} from '@angular/core';
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
import {Category, ProductGift} from '../../interfaces/product-gift';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';

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
    MatFormField
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy
{

  //CLASS PROPERTIES
  private peopleGiftSubscription = new Subscription();

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

  // Método para actualizar la categoría seleccionada
  updateCategory(category: string) {
    this.selectedCategory.set(category);
  }

  //CONSTRUCTOR
  constructor(private peopleGiftService: PeopleGiftService)
  {
    this.peopleGiftSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.peopleGiftSubscription = this.peopleGiftService.getProducts().subscribe(
      (data) => {
        if (data && Array.isArray(data))
        {
          this.peopleGifts.set(data);
        } else {
          console.warn('No se encontraron productos válidos.');
          this.peopleGifts.set([]);
        }
      },
      (error) => {
        console.error('Error al cargar productos:', error);
        this.peopleGifts.set([]);
      }
    );
  }


  ngOnDestroy(): void
  {
    if (this.peopleGiftSubscription)
    {
      this.peopleGiftSubscription.unsubscribe();
    }
  }


}
