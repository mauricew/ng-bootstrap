import {
  Component,
  ComponentFactoryResolver,
  ContentChild,
  ContentChildren,
  Directive,
  Injectable,
  QueryList,
  TemplateRef,
  ViewChildren,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { NgbToastConfig } from "./toast-config";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

/** 
 * The header content of a toast.
 */
@Directive({selector: 'ng-template[ngbToastHeader]'})
export class NgbToastHeader {
  constructor(public templateRef: TemplateRef<any>) { }
}

/** 
 * The body content of a toast.
 */
@Directive({selector: 'ng-template[ngbToastBody]'})
export class NgbToastBody {
  constructor(public templateRef: TemplateRef<any>) { }
}

/**
 * A way to notify people of stuff.
 */
@Component({
  selector: 'ngb-toast',
  exportAs: 'ngbToast',
  host: {
    'class': 'toast',
    '[style.display]': '"block"'
  },
  template: `
    <div class="toast-header">
      <ng-container *ngIf="header">{{header}}</ng-container>
      <ng-template *ngIf="headerTpl" [ngTemplateOutlet]="headerTpl.templateRef"></ng-template>
      <ng-container *ngIf="dismissible">
        <span class="mr-auto"></span>
        <button style="font-size: 1.25rem;" type="button" class="close" (click)="close()"><span aria-hidden="true">&times;</span></button>
      </ng-container>
    </div>
    <div class="toast-body">
      <ng-container *ngIf="body">{{body}}</ng-container>
      <ng-template *ngIf="bodyTpl" [ngTemplateOutlet]="bodyTpl.templateRef"></ng-template>
    </div>
  `
})
export class NgbToast {
  /**
   *  Whether the toast can be closed by the user 
   */
  @Input() dismissible = true;

  /*
   * Header text
   */
  @Input() header: string;

  /**
   * Body Text
   */
  @Input() body: string;

  /**
   * A unique identifier for use in a container 
   */
  @Input() id: number;

  /**
   * An event to perform on close, if dismissible 
   */
  @Output('close') closeEvent = new EventEmitter();

  /**
   * Header content
   */
  @ContentChild(NgbToastHeader) headerTpl: NgbToastHeader;
  
  /**
   * Body content
   */
  @ContentChild(NgbToastBody) bodyTpl: NgbToastBody;

  constructor(private config: NgbToastConfig) { }

  close() {
    this.closeEvent.next(this.id);
  }
}

// This is not permanent!
export interface NgbToastData {
  header: string;
  body: string;
  id?: number;
}

/**
 * A collection of toasts that can be added to programatically.
 * It has a mechanism to automatically dismiss the most recently added ones.
 */
@Component({
  selector: 'ngb-toast-container',
  exportAs: 'ngbToastContainer',
  template: `<ngb-toast *ngFor="let toast of toastData" [id]="toast.id" [header]="toast.header" [body]="toast.body" (close)="closeToast(toast.id)"></ngb-toast>`
})
export class NgbToastContainer {
  static DEFAULT_TIMEOUT = 5000;
  toastData: Array<NgbToastData> = [];
  timeoutIds: { [toastId: number]: number } = {};
  private maxId = 0;

  addToast(data: NgbToastData) {
    data.id = data.id || ++this.maxId;
    this.toastData.unshift(data);
    // How should timeouts work? This is not universal compatible.
    // What about using Observable here?
    this.timeoutIds[data.id] = window.setTimeout(() => this.closeToast(data.id), NgbToastContainer.DEFAULT_TIMEOUT);
  }

  closeToast(toastId: number) {
    const x = this.toastData.findIndex(t => t.id === toastId);
    
    if (x > -1) {
      const id = this.toastData[x].id;
      window.clearTimeout(this.timeoutIds[id]);
      delete this.timeoutIds[id];
      this.toastData.splice(x, 1);
    }    
  }
}
