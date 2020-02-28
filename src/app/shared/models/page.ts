export class Page {

    url: string;
    chapterNumber: number;
    pageNumber: number;
    pageIndex: number;
    text: string;
    type: string;
    commentary: string; 
    flags: Array<string>;
    altText: string;

    constructor(
        url?: string,
        chapterNumber?: number,
        pageNumber?: number,
        text?: string,
        type?: string,
        commentary?: string,
        flags?: Array<string>,
        altText?: string
    ) {
        this.url = url || '';
        this.chapterNumber = chapterNumber || 0;
        this.pageNumber = pageNumber || 0;
        this.text = text || '';
        this.type = type || 'image';
        this.commentary = commentary || 'Nothing to say this time.'
        this.flags = flags || [];
        this.altText = altText;
        this.pageIndex = this.pageNumber - 1;
    }
    
}
