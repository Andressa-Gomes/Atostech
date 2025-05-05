import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MariaComponent } from './maria.component';

describe('MariaComponent', () => {
  let component: MariaComponent;
  let fixture: ComponentFixture<MariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
