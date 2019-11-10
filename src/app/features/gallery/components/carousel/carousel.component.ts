import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Page } from 'src/app/shared/models/page';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnChanges {

  @Input() page: Page;
  @Input() safeURL: SafeResourceUrl;
  @Input() enableNext: boolean;
  @Input() enablePrevious: boolean; 
  @Output() gotoNextPage = new EventEmitter<boolean>();
  @Output() gotoPreviousPage = new EventEmitter<boolean>();

  url: string;
  title: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.updateCarousel();
    
  }

  ngOnChanges() {
    this.updateCarousel();
  }

  updateCarousel() {
    this.url = this.page.url;
    this.title = this.page.altText;
    if (this.page.type === 'video') {
      this.url = `${this.url}?modestbranding=1&autoplay=1&rel=0&controls=0&showinfo=0&disablekb=1&origin=https%3A%2F%2Fwww.nhm.ac.uk`;
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }

  getUrl() {
    return `url(${this.url})`;
  }

  nextPage() {
    if (this.enableNext) {
      this.gotoNextPage.emit(true);
      document.getElementById("carousel-content").focus();
    }
  }

  previousPage() {
    if (this.enablePrevious) {
      this.gotoPreviousPage.emit(true);
      document.getElementById("carousel-content").focus();
    }
  }

}