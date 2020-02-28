import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';

import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() id: string;
  private modal: any;
  focusableEls: Array<any>;
  firstFocusableEl: any;
  lastFocusableEl: any;
  focusedElBeforeOpen: any;

  constructor(
    private renderer: Renderer2,
    private modalService: ModalService, 
    private el: ElementRef) {
      this.modal = el.nativeElement;
  }

  ngOnInit(): void {
      let modal = this;

      // ensure id attribute exists
      if (!this.id) {
          console.error('modal must have an id');
          return;
      }

      // move element to bottom of page (just before </body>) so it can be displayed above everything else
      document.body.appendChild(this.modal);

      // add self (this modal instance) to the modal service so it's accessible from controllers
      this.modalService.add(this);
      this.close();
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
      this.modalService.remove(this.id);
      this.modal.remove();
  }

  // open modal
  open(): void {
      this.renderer.setStyle(this.modal, 'display', 'block');

      this.focusedElBeforeOpen = document.activeElement;

      var focusableEls = this.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
      this.firstFocusableEl = focusableEls[0];
      this.lastFocusableEl = focusableEls[focusableEls.length - 1];

      this.firstFocusableEl.focus();

      document.getElementById("page-content").setAttribute("style", "filter: blur(20px);"); 
      document.getElementsByTagName("footer")[0].setAttribute("style", "filter: blur(20px);"); 
      document.getElementById("page-content-overlay").style.display = "block"; 
      document.body.classList.add('app-modal-open');
  }

  // close modal
  close(): void {
      document.getElementById("page-content").removeAttribute('style');
      document.getElementsByTagName("footer")[0].removeAttribute('style');
      document.getElementById("page-content-overlay").style.display = "none"; 
      this.renderer.setStyle(this.modal, 'display', 'none');
      var elementExists = document.body.contains(this.focusedElBeforeOpen);
      if(this.focusedElBeforeOpen && elementExists) {
        this.focusedElBeforeOpen.focus();
      } else {
        document.getElementById("banner").focus();
      }
      document.body.classList.remove('app-modal-open');
  }

  // handle tabbing events for modal
  onKeydown(event: KeyboardEvent) {
    if(event.key === 'Tab') {
        if(event.shiftKey) {
            if(document.activeElement === this.firstFocusableEl) {
                event.preventDefault();
                this.lastFocusableEl.focus();
            } 
        } else {
            if (document.activeElement === this.lastFocusableEl) {
                event.preventDefault();
                this.firstFocusableEl.focus();
            } 
        }
    }      
  }

}
