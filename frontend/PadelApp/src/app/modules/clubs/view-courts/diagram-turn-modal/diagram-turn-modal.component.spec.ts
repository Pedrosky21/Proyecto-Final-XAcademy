import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramTurnModalComponent } from './diagram-turn-modal.component';

describe('DiagramTurnModalComponent', () => {
  let component: DiagramTurnModalComponent;
  let fixture: ComponentFixture<DiagramTurnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagramTurnModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagramTurnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
