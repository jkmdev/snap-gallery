import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Chapter } from '../../models/chapter';
import { Page } from 'src/app/shared/models/page';
import { ModalService } from '../../services/modal.service';

import galleryJSON from '../../../../../src/data/gallery.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnChanges {

  @Input() chapters: Chapter[];
  @Input() currentPage: Page;
  @Output() changeCurrentChapter = new EventEmitter<number>();
  @Output() changeCurrentPage = new EventEmitter<number>();

  selectedChapter: number;
  selectedPage: number;

  sectionSelectTitle: string;
  pageSelectTitle: string;
  title: string;
  links: any[] = [
    {
      name: 'About'
    }
  ];
  galleryJSON = galleryJSON;
  aboutModalId = 'about-modal';
  audioWarningModalId = 'audio-warning-modal';
  videoWarningModalId = 'video-warning-modal';

  pageNumbers: number[];

  constructor(private modalService: ModalService) {
    this.title = galleryJSON.title;
    this.sectionSelectTitle = galleryJSON.sectionSelectTitle;
    this.pageSelectTitle = galleryJSON.pageSelectTitle;
  }

  ngOnChanges() {
    if (this.currentPage) {
      const pageAmount = this.chapters[this.currentPage.chapterNumber].pageAmount;
      this.pageNumbers = Array(pageAmount).fill(0).map((x, i) => i + 1);
      this.selectedChapter = this.currentPage.chapterNumber;
      this.selectedPage = this.currentPage.pageNumber;
    } else {
      this.pageNumbers = [];
    }
  }

  updateChapterNumber() {
    this.changeCurrentChapter.emit(this.selectedChapter);
  }

  updatePageNumber() {
    this.changeCurrentPage.emit(this.selectedPage);
  }

  goToFirstPage(){
    this.changeCurrentChapter.emit(0);
    this.changeCurrentPage.emit(1);
    this.modalService.close(this.aboutModalId);
  }

  closeAboutModal() {
    this.modalService.close(this.aboutModalId);
  }

  setSkipContentStyle() {
    document.getElementById('skip-content-link').setAttribute("style", "width: 200px; border: 1px solid blue;");
  }

  removeSkipContentStyle() {
    document.getElementById('skip-content-link').setAttribute("style", "width: 0px; color:red;");
  }

  skipContent() {
    let focusEl = document.getElementById('carousel-content');
    focusEl.setAttribute("tabindex", "0");
    focusEl.focus();
    focusEl.setAttribute("tabindex", "-1");
  }

  openAboutModal() {
    this.modalService.open(this.aboutModalId);
  }

}
