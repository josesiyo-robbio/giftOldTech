import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

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
export class HomePageComponent
{
  cards = [
    {
      title: 'Shiba Inu',
      subtitle: 'Dog Breed',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
    },
    {
      title: 'Golden Retriever',
      subtitle: 'Dog Breed',
      image: 'https://material.angular.io/assets/img/examples/golden2.jpg',
      description: 'The Golden Retriever is a large, friendly dog breed known for its intelligence and loyalty.',
    },
    {
      title: 'Persian Cat',
      subtitle: 'Cat Breed',
      image: 'https://material.angular.io/assets/img/examples/persian2.jpg',
      description: 'The Persian cat is known for its long, luxurious fur and its calm, affectionate temperament.',
    },
    {
      title: 'Labrador Retriever',
      subtitle: 'Dog Breed',
      image: 'https://material.angular.io/assets/img/examples/labrador2.jpg',
      description: 'Labrador Retrievers are friendly, outgoing, and highly intelligent dogs.',
    },
    {
      title: 'Siamese Cat',
      subtitle: 'Cat Breed',
      image: 'https://material.angular.io/assets/img/examples/siamese2.jpg',
      description: 'Siamese cats are known for their striking blue eyes and sleek, elegant appearance.',
    },
    {
      title: 'Beagle',
      subtitle: 'Dog Breed',
      image: 'https://material.angular.io/assets/img/examples/beagle2.jpg',
      description: 'The Beagle is a small to medium-sized breed of dog that is friendly and curious.',
    }
  ];

}
