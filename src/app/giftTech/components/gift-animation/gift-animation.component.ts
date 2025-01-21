import { Component } from '@angular/core';
import {AnimationOptions, LottieComponent, provideLottieOptions} from 'ngx-lottie';
import player, {AnimationItem, LottiePlayer} from 'lottie-web';

@Component({
  selector: 'giftTech-gift-animation',
  imports: [ LottieComponent ],
  templateUrl: './gift-animation.component.html',
  styleUrl: './gift-animation.component.css',
  providers: [   provideLottieOptions({
    player: () : LottiePlayer => player,
  }),]
})
export class GiftAnimationComponent
{
  options: AnimationOptions = {
    path: '/animations/giftAnimation.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
