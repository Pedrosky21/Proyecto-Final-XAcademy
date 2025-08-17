import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatedMatchComponent } from './modal-created-match.component';

describe('ModalCreatedMatchComponent', () => {
  let component: ModalCreatedMatchComponent;
  let fixture: ComponentFixture<ModalCreatedMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreatedMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreatedMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
