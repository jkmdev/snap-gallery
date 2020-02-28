import { Injectable } from '@angular/core';

import { Page } from '../../shared/models/page';
import { Chapter } from '../../shared/models/chapter';
import { Gallery } from '../../shared/models/gallery';
import { HttpErrorResponse } from '@angular/common/http';

import galleryJSON from '../../../../src/data/gallery.json';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryManagerService {

  private _gallery: Gallery;

  private readonly _currentPage = new BehaviorSubject<Page>(new Page());
  readonly currentPage$ = this._currentPage.asObservable();

  get currentPage(): Page {
    return this._currentPage.getValue();
  }

  get gallery(): Gallery {
    return this._gallery;
  }

  nsfwWarningModalId = 'nsfw-warning-modal';

  error: HttpErrorResponse;

  constructor() { 
    this.init();
  }

  init() {
    this._gallery = new Gallery(galleryJSON);
    this.goToLatestChapter();
  }

  private setPage(chapterNumber, pageNumber) {
    let chapter = this.gallery.getChapter(chapterNumber)
    this._currentPage.next(chapter.getPage(pageNumber));
  }

  // CHAPTER/PAGE NAVIGATION

  goToLatestChapter() {
    const latestChapterNumber = this.gallery.getLatestChapterNumber();
    this.goToChapter(latestChapterNumber, false);
  }

  goToChapter(newChapterNumber, startAtBeginning: boolean = true) {
    let currentChapter = this.gallery.getChapter(newChapterNumber);
    let chapterNumber = currentChapter.chapterNumber;
    if(startAtBeginning) {
      this.setPage(chapterNumber, 1);
    } else {
      this.setPage(chapterNumber, currentChapter.pageAmount);
    }
  }

  goToPage(pageNumber) {

    if (typeof pageNumber === 'string') {
      pageNumber = parseInt(pageNumber, 10);
    }

    const chapterNumber = this.currentPage.chapterNumber;

    if(pageNumber > this.currentPage.pageNumber) { // go to next page
      if(this.atLastPageInChapter() && !this.atLastPageInGallery()) { // go to next chapter
        this.goToChapter(chapterNumber + 1);
      } else {
        this.setPage(chapterNumber, pageNumber);
      }
    } else if(pageNumber < this.currentPage.pageNumber) { // go to previous page
      if(this.atFirstPageInChapter() && this.isNotFirstChapterInGallery()) { // go to previous chapter
        this.goToChapter(chapterNumber - 1, false);
      } else {
        this.setPage(chapterNumber, pageNumber);
      }
    }

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

  // BOOLEAN

  atLastPageInChapter() {
    return this.currentPage &&
           this.currentPage.pageNumber === this.returnCurrentChapter().pageAmount;
  }

  atFirstPageInChapter() {
    return this.currentPage &&
           this.currentPage.pageNumber === 1;
  }

  atLastPageInGallery() {
    return this.currentPage && 
           (this.currentPage.pageNumber === this.returnCurrentChapter().pageAmount &&
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

  // RETURNING DATA

  returnCurrentChapter() {
    return this.gallery.getChapter(this.currentPage.chapterNumber);
  }

  returnAllGalleryChapters() {
    return this.gallery ? this.gallery.chapters : [];
  }

}
