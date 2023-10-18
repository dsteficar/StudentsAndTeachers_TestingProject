import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassesComponent } from './school-classes.component';

describe('SchoolClassesComponent', () => {
  let component: SchoolClassesComponent;
  let fixture: ComponentFixture<SchoolClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolClassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
