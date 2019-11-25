import { HostListener, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from './shared/services/modal.service';
import { GalleryComponent } from './features/gallery/gallery.component';

import { GalleryManagerService } from './shared/services/gallery-manager.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(GalleryComponent) child:GalleryComponent;
  title = 'snap-gallery'; 

  constructor(
    private element: ElementRef,
    private modalService: ModalService,
    public galleryManagerService: GalleryManagerService
  ) {
    galleryManagerService.init();
  }

  ngOnInit() {
    this.element.nativeElement.focus();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEscape(event: KeyboardEvent) { 
    this.modalService.closeAll();
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  handleKeyboardEventArrowLeft(event: KeyboardEvent) { 
    this.galleryManagerService.gotoPreviousPage();
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  handleKeyboardEventArrowRight(event: KeyboardEvent) { 
    this.galleryManagerService.gotoNextPage();
  }


}
