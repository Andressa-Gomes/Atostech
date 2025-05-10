import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchCourseComponent } from './watch-course.component';

describe('CourseDetailComponent', () => {
  let component: WatchCourseComponent;
  let fixture: ComponentFixture<WatchCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
