/**
 * class GalleryComponent
 *
 * Purpose: Passes current page information to child components, handles their outputs
 *    triggers gallery state changes based off events
 */

import { Component } from '@angular/core';

import { ModalService } from '../../shared/services/modal.service';
import { GalleryManagerService } from '../../shared/services/gallery-manager.service';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent{

  goingForwardInGallery: boolean;

  nsfwWarningModalId = 'nsfw-warning-modal';

  error: HttpErrorResponse;

  constructor(
    private modalService: ModalService,
    public galleryManagerService: GalleryManagerService
  ) {}

  hasBlockingFlag() {
    var blockPage = false;
    var blockingFlags = ['nsfw'];
    this.galleryManagerService.currentPage.flags.forEach(flag => {
      if (blockingFlags.includes(flag)) blockPage = true;
    });
    return blockPage;
  }

  openFlagModal() {
    this.galleryManagerService.currentPage.flags.forEach(flag => {
      switch (flag) {
        case 'nsfw': 
        this.modalService.open(this.nsfwWarningModalId);
          break;
        default: break;
      }
    });
  }

  skipPage(id) {
    if(this.goingForwardInGallery) {
      //this.incrementPageBy(2);
    } else {
      this.galleryManagerService.goToPage(this.galleryManagerService.currentPage.pageNumber - 2);
    }
    this.modalService.close(id);
  }

  closeNSFWModal() {
    this.modalService.close(this.nsfwWarningModalId);
  }

}
