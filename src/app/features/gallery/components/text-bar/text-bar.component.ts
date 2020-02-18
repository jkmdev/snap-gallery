import { Component, OnInit, Input } from '@angular/core';
import { GalleryManagerService } from '../../../../shared/services/gallery-manager.service';

import { Page } from 'src/app/shared/models/page';

@Component({
  selector: 'app-text-bar',
  templateUrl: './text-bar.component.html',
  styleUrls: ['./text-bar.component.scss']
})
export class TextBarComponent implements OnInit {

  currentPage : Page;
  @Input() text: string;

  constructor(
    public galleryManagerService: GalleryManagerService
  ) { 
    galleryManagerService.currentPage$.subscribe(
      newPage => this.currentPage = newPage,
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
  }

  ngOnInit() {
  }

  isVisible(pos) {
    if(this.galleryManagerService.atLastPageInGallery() && pos === 'end') {
      return '#4d4e4f';
    } else if (this.galleryManagerService.atFirstPageInGallery() && pos === 'start') {
      return '#4d4e4f';
    } else {
      return '#ffffff';
    }
  }

}
