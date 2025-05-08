import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbntComponent } from './ebnt.component';

describe('EbntComponent', () => {
  let component: EbntComponent;
  let fixture: ComponentFixture<EbntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EbntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EbntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
