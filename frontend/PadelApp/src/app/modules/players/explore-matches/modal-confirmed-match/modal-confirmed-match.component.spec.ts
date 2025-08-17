import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmedMatchComponent } from './modal-confirmed-match.component';

describe('ModalConfirmedMatchComponent', () => {
  let component: ModalConfirmedMatchComponent;
  let fixture: ComponentFixture<ModalConfirmedMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfirmedMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmedMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
