import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAcceptMatchComponent } from './modal-accept-match.component';

describe('ModalAcceptMatchComponent', () => {
  let component: ModalAcceptMatchComponent;
  let fixture: ComponentFixture<ModalAcceptMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAcceptMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAcceptMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
