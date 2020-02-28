import { Chapter } from './chapter';

export class Gallery {

    title: string;
    chapterAmount: number;
    chapters: Array<Chapter>;

    constructor(
        galleryJSON?: any
    ) {
        this.title = galleryJSON.title || '';
        this.chapterAmount = 0;
        this.chapters = [];

        galleryJSON.chapters.forEach((chapterJSON) =>{

            this.addNewChapter(chapterJSON.title);
      
            chapterJSON.pages.forEach((pageJSON) => {
              this.getLatestChapter().addNewPage(     
                pageJSON
              );
            })
      
        });

    }

    private addNewChapter(title: string) {
        this.chapters.push(
            new Chapter(
                title,
                this.chapterAmount++
            )
        );
    }

    getChapter(chapterNumber: number) {
        if (typeof chapterNumber === 'string') {
            chapterNumber = parseInt(chapterNumber, 10);
        }
        return this.chapters[chapterNumber];
    }

    getLatestChapter() {
        return this.chapters[this.chapterAmount - 1];
    }

    getLatestChapterNumber() {
        return this.chapterAmount - 1;
    }

  }
