import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MatchModalProps } from '../models/ModalProps';

@Injectable({ providedIn: 'root' })
export class MatchModalService {
  constructor() {}

  private modalState = new Subject<MatchModalProps | null>();

  openModal(props: MatchModalProps) {
    this.modalState.next(props);
  }

  closeModal() {
    this.modalState.next(null);
  }

  getModalState(): Observable<MatchModalProps | null> {
    return this.modalState.asObservable();
  }
}
