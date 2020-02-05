import { Component } from '@angular/core';
import { Chapter } from '../../models/chapter';
import { Page } from 'src/app/shared/models/page';

import { ModalService } from '../../services/modal.service';
import { GalleryManagerService } from '../../../shared/services/gallery-manager.service';

import galleryJSON from '../../../../../src/data/gallery.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentPage: Page;
  chapters: Chapter[];

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

  constructor(
      private modalService: ModalService,
      public galleryManagerService: GalleryManagerService
    ) {
    this.title = galleryJSON.title;
    this.sectionSelectTitle = galleryJSON.sectionSelectTitle;
    this.pageSelectTitle = galleryJSON.pageSelectTitle;
    this.chapters = galleryManagerService.returnAllGalleryChapters();
    galleryManagerService.currentPage$.subscribe(
      newPage => this.updateCurrentPage(newPage),
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
  }

  private updateCurrentPage(newPage) {
    this.currentPage = newPage;
    if (this.currentPage) {
      const pageAmount = this.chapters[this.currentPage.chapterNumber].pageAmount;
      this.pageNumbers = Array(pageAmount).fill(0).map((x, i) => i + 1);
      this.selectedChapter = this.currentPage.chapterNumber;
      this.selectedPage = this.currentPage.pageNumber;
    } else {
      this.pageNumbers = [];
    }
  }

  // update navbar when current page changes

  updateChapterNumber() {
    this.galleryManagerService.goToChapter(this.selectedChapter);
  }

  updatePageNumber() {
    this.galleryManagerService.goToPage(this.selectedPage);
  }

  goToFirstPage(){
    this.selectedChapter = 0;
    this.selectedPage = 1;
    this.updateChapterNumber();
    this.updatePageNumber();
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

  toggleImageZoom() {

    var zoomIconElem = document.getElementById("zoom-icon");
    var carouselElem = document.getElementsByClassName("carousel")[0];

    var zoomedInHtml = '<i class="fa fa-search-plus"></i>';
    var zoomedOutHtml = '<i class="fa fa-search-minus"></i>';

    if (zoomIconElem.innerHTML === zoomedOutHtml) {
      zoomIconElem.innerHTML = zoomedInHtml;
      carouselElem.classList.remove("zoomed-in-img");
    } else {
      zoomIconElem.innerHTML = zoomedOutHtml;
      carouselElem.classList.add("zoomed-in-img");
    }
    
    // var element = document.getElementsByClassName("carousel")[0];
    // console.log(element);
    // element.classList.add("zoomed-in-img");

    
    // document.getElementById("zoom-icon").innerHTML = "<div>big dick</div>";
    // console.log($event);
    // $event.srcElement.className = 'fa fa-search-minus';
    // $event.srcElement.parentElement.innerHtml = "<div>big dick</div>"
    // console.log($event.srcElement.parentElement.innerHtml);
  }

  zoomOutImage(e) {
    var element = document.getElementsByClassName("carousel")[0];
    console.log(element);
    element.classList.add("zoomed-out-img");
    var element = document.getElementsByClassName("carousel")[0];
  }

}
