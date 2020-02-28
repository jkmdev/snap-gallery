import { Page } from './page';

export class Chapter {

    pageAmount: number;
    title: string;
    chapterNumber: number;
    pages: Page[];

    constructor(
        title?: string,
        chapterNumber?: number,
        pages?: Page[]
    ) {
        this.title = title || 'Untitled';
        this.chapterNumber = chapterNumber || 0;
        this.pageAmount =  0;
        this.pages = pages || [];
    }

    addNewPage(page) {
        this.pages.push(new Page(
            page.url,
            this.chapterNumber,
            ++this.pageAmount,
            page.text,
            page.type,
            page.commentary,
            page.flags,
            page.altText
        ));
    }

    addExistingPage(newPage) {
        this.pages.push(newPage);
        this.pages.sort((b, a) => {
            return b.pageNumber - a.pageNumber;
        });
        this.pageAmount++;
    }

    getPage(pageNumber) {
        return this.pages[pageNumber - 1];
    }
    
}
