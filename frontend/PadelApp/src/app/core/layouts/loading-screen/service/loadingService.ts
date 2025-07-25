import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root' 
  })
export class loadingScreenService {

    constructor() {}
  
    private readonly loadingScreenMessage= new Subject<string|null>();
    
    getInfo(): Observable<string|null> {
      return this.loadingScreenMessage.asObservable()
    }

    showLoadingScreen(props: string|null): void {
        this.loadingScreenMessage.next(props);
      }
    
  }
  