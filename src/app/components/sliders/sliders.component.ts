import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { IMAGE_SIZES } from 'src/app/constants/image-sizes';

@Component({
  selector: 'slider',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')])
    ])
  ]
})
export class SliderComponent implements OnInit {
  @Input() items: Movie[] = [];

  readonly imageSizes = IMAGE_SIZES;

  currentSlideIndex: number = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
    }, 5000);
  }
}
