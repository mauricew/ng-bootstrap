import { Component, ViewChild } from '@angular/core';
import { NgbToastContainer } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-toast-regular',
  templateUrl: './toast-regular.html',
  styles: [`
    :host {
      display: block;
      position: relative;
      height: 480px;
      overflow-y: auto;
    }
    ngb-toast-container {
      display: block;
      position: absolute;
      bottom: .25rem;
      right: .25rem;
      z-index: 1100;
    }
  `]
})
export class NgbdToastRegular {
  toastCounter = 0;

  @ViewChild('toastContainer')
  toastContainer: NgbToastContainer;

  addToast() {
    this.toastContainer.addToast({
      header: 'New notification',
      body: `Hello this is notification #${++this.toastCounter}`
    });
  }    
}