import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateMatchComponent } from './modal-create-match.component';

describe('ModalCreateMatchComponent', () => {
  let component: ModalCreateMatchComponent;
  let fixture: ComponentFixture<ModalCreateMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
