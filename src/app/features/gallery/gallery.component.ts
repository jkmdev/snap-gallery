/**
 * class GalleryComponent
 *
 * Purpose: Passes current page information to child components, handles their outputs
 *    triggers gallery state changes based off events
 */

import { Component } from '@angular/core';

import { ModalService } from '../../shared/services/modal.service';
import { Page } from '../../shared/models/page';
import { Chapter } from '../../shared/models/chapter';
import { Gallery } from '../../shared/models/gallery';
import { HttpErrorResponse } from '@angular/common/http';

import galleryJSON from '../../../../src/data/gallery.json';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent{

  gallery: Gallery;
  currentChapter: Chapter;
  currentPage: Page;
  goingForwardInGallery: boolean;

  nsfwWarningModalId = 'nsfw-warning-modal';

  error: HttpErrorResponse;

  constructor(
    private modalService: ModalService
  ) {

    this.gallery = new Gallery(galleryJSON.title);

    galleryJSON.chapters.forEach((chapterJSON) =>{

      this.gallery.addNewChapter(chapterJSON.title);

      chapterJSON.pages.forEach((pageJSON) => {
        this.gallery.getLatestChapter().addNewPage(     
          pageJSON
        );
      })

    });

    const latestChapterNumber = this.gallery.getLatestChapterNumber();
    this.goToChapterAndPage(latestChapterNumber, false);
    this.goingForwardInGallery = true;

  }

  // PAGINATION/NAVIGATION

  goToChapterAndPage(chapterNumber, startAtBeginning: boolean = true) {
    this.currentChapter = this.gallery.getChapter(chapterNumber);
    if(startAtBeginning) {
      this.currentPage = this.currentChapter.getPage(1);
    } else {
      this.currentPage = this.currentChapter.getPage(this.currentChapter.pageAmount);
    }
  }

  goToPage(pageNumber) {

    if (typeof pageNumber === 'string') {
      pageNumber = parseInt(pageNumber, 10);
    }

    if(pageNumber > this.currentPage.pageNumber) { // go to next page
      if(this.atLastPageInChapter() && !this.atLastPageInGallery()) { // go to next chapter
        const chapterNumber = this.currentPage.chapterNumber + 1;
        this.goToChapterAndPage(chapterNumber);
      } else {
        this.setPage(pageNumber);
      }
    } else if(pageNumber < this.currentPage.pageNumber) { // go to previous page
      if(this.atFirstPageInChapter() && this.isNotFirstChapterInGallery()) { // go to previous chapter
        const chapterNumber = this.currentPage.chapterNumber - 1;
        this.goToChapterAndPage(chapterNumber, false);
      } else {
        this.setPage(pageNumber);
      }
    }

  }

  setPage(pageNumber) {
    this.currentPage = this.currentChapter.getPage(pageNumber);
  }

  gotoNextPage() {
    if(!this.atLastPageInGallery()) {
      var nextPageNum = this.currentPage.pageNumber + 1;
      this.goToPage(nextPageNum);
    }
  }

  gotoPreviousPage() {
    if(!this.atFirstPageInGallery()) {
      var previousPageNum = this.currentPage.pageNumber - 1;
      this.goToPage(previousPageNum);
    }
  }

  skipPage(id) {
    if(this.goingForwardInGallery) {
      //this.incrementPageBy(2);
    } else {
      this.goToPage(this.currentPage.pageNumber - 2);
    }
    this.modalService.close(id);
  }

  hasBlockingFlag() {
    var blockPage = false;
    var blockingFlags = ['nsfw'];
    this.currentPage.flags.forEach(flag => {
      if (blockingFlags.includes(flag)) blockPage = true;
    });
    return blockPage;
  }

  openFlagModal() {
    this.currentPage.flags.forEach(flag => {
      switch (flag) {
        case 'nsfw': 
        this.modalService.open(this.nsfwWarningModalId);
          break;
        default: break;
      }
    });
  }

  // BOOLEAN

  atLastPageInChapter() {
    return this.currentPage &&
           this.currentPage.pageNumber === this.currentChapter.pageAmount;
  }

  atFirstPageInChapter() {
    return this.currentPage &&
           this.currentPage.pageNumber === 1;
  }

  atLastPageInGallery() {
    return this.currentPage && 
           (this.currentPage.pageNumber === this.currentChapter.pageAmount &&
           this.currentPage.chapterNumber === this.gallery.getLatestChapterNumber());
  }

  atFirstPageInGallery() {
    return this.currentPage &&
           this.currentPage.pageNumber === 1 && this.currentPage.chapterNumber === 0;
  }

  isNotFirstChapterInGallery() {
    return this.currentPage && 
           this.currentPage.chapterNumber > 0;
  }

  closeNSFWModal() {
    this.modalService.close(this.nsfwWarningModalId);
  }

}
