import { TestBed } from '@angular/core/testing';

import { GalleryManagerService } from './gallery-manager.service';

describe('GalleryManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalleryManagerService = TestBed.get(GalleryManagerService);
    expect(service).toBeTruthy();
  });
});
