import { TestBed } from '@angular/core/testing';

import { CourseAdminService } from './course-admin.service';

describe('CourseAdminService', () => {
  let service: CourseAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
