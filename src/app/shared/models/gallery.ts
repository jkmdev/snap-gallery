/**
 * class Gallery
 *
 * Purpose: Load gallery with pages, keeps track of what chapters are in the gallery, defines the structure of the gallery
 */

import { Chapter } from './chapter';
import { Page } from './page';

export class Gallery {

    title: string;
    chapterAmount: number;
    chapters: Array<Chapter>;

    constructor(
        title?: string
    ) {
        this.title = title || '';
        this.chapterAmount = 0;
        this.chapters = [];
    }

    addNewChapter(title: string) {
        this.chapters.push(
            new Chapter(
                title,
                this.chapterAmount++
            )
        );
    }

    addExistingChapter(chapter: Chapter) {
        ++this.chapterAmount;
        chapter.chapterNumber = this.chapterAmount;
        this.chapters.push(chapter);
        console.log(this.chapters);
    }

    // PARSING SERVICE START
    addPostsToGallery(posts) {
        posts.forEach(post => {
            const tags = post.tags;
            let url = '';
            let type = '';
            const chapterNumber = this.parseChapterNumber(tags);
            const pageIndex = this.parsePageIndex(tags);
            if (post.type === 'photo') {
                url = post.photos[0].original_size.url;
                type = 'image';
            } else {
                url = this.urlToLinkEmbed(post.url);
                type = 'video';
            }
            const page = new Page(
                url,
                chapterNumber,
                pageIndex,
                post.summary,
                type
            );
            this.getChapter(chapterNumber).addExistingPage(page);
        });
    }

    urlToLinkEmbed(url) {
        const keyIndex = url.indexOf('v=') + 2;
        let key = '';
        if (url.includes('v=')) {
            key = url.substring(keyIndex);
        }
        return `https://www.youtube.com/embed/${key}`;
    }

    parseChapterNumber(tags) {
        let chapterNumber = 0;
        tags.forEach(tag => {
            if (tag.includes('c=')) {
                const parsedChapterNumber = parseInt(tag.substring(2), 10);
                chapterNumber = parsedChapterNumber ? parsedChapterNumber : 0;
            }
        });
        return chapterNumber;
    }

    parsePageIndex(tags) {
        let pageNumber = null;
        tags.forEach(tag => {
            if (tag.includes('p=')) {
                pageNumber = parseInt(tag.substring(2), 10);
            }
        });
        return pageNumber;
    }

    // PARSING SERVICE END
    getChapter(chapterNumber: number) {
        if (typeof chapterNumber === 'string') {
            chapterNumber = parseInt(chapterNumber, 10);
        }
        return this.chapters[chapterNumber];
    }

    getLatestChapter() {
        return this.chapters[this.chapterAmount - 1];
    }

    getChapterAmount() {
        return this.chapterAmount;
    }

    getLatestChapterNumber() {
        return this.chapterAmount - 1;
    }

  }
