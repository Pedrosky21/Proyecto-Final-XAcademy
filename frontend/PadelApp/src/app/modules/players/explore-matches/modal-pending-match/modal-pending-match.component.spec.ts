import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPendingMatchComponent } from './modal-pending-match.component';

describe('ModalPendingMatchComponent', () => {
  let component: ModalPendingMatchComponent;
  let fixture: ComponentFixture<ModalPendingMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPendingMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPendingMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
