import { Observable, Subject } from "rxjs";
import { ModalProps } from "../models/ModalProps";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root' 
  })
export class ConfirmationModalService {

    constructor() {}
  
    private readonly modalInfo = new Subject<ModalProps|null>();
    
    getInfo(): Observable<ModalProps|null> {
      return this.modalInfo.asObservable()
    }

    openModal(props: ModalProps): void {
        this.modalInfo.next(props);
      }
    
    closeModal(): void {
    this.modalInfo.next(null);
    }
  }
  