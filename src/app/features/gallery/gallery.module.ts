import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GalleryComponent } from './gallery.component';
import { TextBarComponent } from './components/text-bar/text-bar.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [GalleryComponent, TextBarComponent, CarouselComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ],
  exports: [
    GalleryComponent
  ]
})
export class GalleryModule { }
