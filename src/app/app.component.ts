import { HostListener, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from './shared/services/modal.service';
import { GalleryComponent } from './features/gallery/gallery.component';

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
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.element.nativeElement.focus();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEscape(event: KeyboardEvent) { 
    this.modalService.closeAll();
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  handleKeyboardEventArrowLeft(event: KeyboardEvent) { 
    this.child.galleryManagerService.gotoPreviousPage();
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  handleKeyboardEventArrowRight(event: KeyboardEvent) { 
    this.child.galleryManagerService.gotoNextPage();
  }


}
