import {Component} from '@angular/core';
import {DEMO_SNIPPETS} from './demos';

@Component({
  selector: 'ngbd-toast',
  template: `
  <ngbd-component-wrapper component="Toast">
    <ngbd-api-docs directive="NgbToast"></ngbd-api-docs>
    <ngbd-api-docs directive="NgbToastContainer"></ngbd-api-docs>
    <ngbd-example-box demoTitle="Standalone Toast" [snippets]="snippets" component="toast" demo="basic">
      <ngbd-toast-basic></ngbd-toast-basic>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Toast Container" [snippets]="snippets" component="toast" demo="regular">
      <ngbd-toast-regular></ngbd-toast-regular>
    </ngbd-example-box>
  </ngbd-component-wrapper>
  `
})
export class NgbdToast {
  snippets = DEMO_SNIPPETS;
}
