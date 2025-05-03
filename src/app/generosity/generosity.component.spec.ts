import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerosityComponent } from './generosity.component';

describe('GenerosityComponent', () => {
  let component: GenerosityComponent;
  let fixture: ComponentFixture<GenerosityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerosityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerosityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
