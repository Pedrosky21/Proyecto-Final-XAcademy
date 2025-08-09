import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtModalComponent } from './court-modal.component';

describe('CourtModalComponent', () => {
  let component: CourtModalComponent;
  let fixture: ComponentFixture<CourtModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
