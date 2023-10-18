import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeacherFormComponent } from './student-teacher-form.component';

describe('StudentTeacherFormComponent', () => {
  let component: StudentTeacherFormComponent;
  let fixture: ComponentFixture<StudentTeacherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTeacherFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTeacherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
