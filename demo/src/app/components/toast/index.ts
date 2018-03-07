export * from './toast.component';

import { NgModule } from "@angular/core";
import { NgbdSharedModule } from "../../shared";
import { NgbdComponentsSharedModule } from "../shared";
import { NgbdToast } from "./toast.component";
import { DEMO_DIRECTIVES } from './demos';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdToast],
  declarations: [NgbdToast, ...DEMO_DIRECTIVES]
})
export class NgbdToastModule {}