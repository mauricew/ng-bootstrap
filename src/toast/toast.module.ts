import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbToastBody, NgbToastHeader, NgbToast, NgbToastContainer } from "./toast";
import { NgbToastConfig } from "./toast-config";

export * from './toast';

@NgModule({
    declarations: [NgbToastBody, NgbToastHeader, NgbToast, NgbToastContainer],
    imports: [ CommonModule ],
    exports: [ NgbToastBody, NgbToastHeader, NgbToast, NgbToastContainer ]
})
export class NgbToastModule {
  static forRoot(): ModuleWithProviders { return {ngModule: NgbToastModule, providers: [NgbToastConfig]}; }
}