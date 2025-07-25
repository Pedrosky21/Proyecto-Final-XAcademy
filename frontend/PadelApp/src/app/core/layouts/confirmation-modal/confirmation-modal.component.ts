import { Component } from '@angular/core';
import { ModalIconEnum, ModalProps } from './models/ModalProps';
import { Subscription } from 'rxjs';
import { ConfirmationModalService } from './service/confirmationModalService';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {


  modalProps: ModalProps | null = null;
  ModalIcon = ModalIconEnum;
  subscription: Subscription;


  constructor(
    private service: ConfirmationModalService,
  ) {
    this.subscription = this.service.getInfo().subscribe((modalInfo) => {
      this.modalProps = modalInfo;
    })
  }


  handleRejectClick = () => {
    this.modalProps?.reject?.action();
  }


  handleConfirmClick = () => {
    this.modalProps?.accept.action();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getFooterClass(){
    return this.modalProps?.reject?'footer':'singleFooter'
  }
}
