import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CntComponent } from './cnt.component';

describe('CntComponent', () => {
  let component: CntComponent;
  let fixture: ComponentFixture<CntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
