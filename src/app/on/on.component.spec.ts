import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnComponent } from './on.component';

describe('OnComponent', () => {
  let component: OnComponent;
  let fixture: ComponentFixture<OnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
