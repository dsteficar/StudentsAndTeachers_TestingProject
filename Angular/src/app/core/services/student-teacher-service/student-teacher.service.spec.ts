import { TestBed } from '@angular/core/testing';

import { StudentTeacherService } from './student-teacher.service';

describe('StudentTeacherService', () => {
  let service: StudentTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
