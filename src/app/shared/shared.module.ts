import { NgModule } from "@angular/core";
import { BorderifyDirective } from "./directive/borderify.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {StringTruncatePipe} from "./pipes/string-truncate.pipe";
import {Destroyer} from "./utils/destroyer";

@NgModule({
    imports: [ReactiveFormsModule],
    exports: [BorderifyDirective, ReactiveFormsModule, StringTruncatePipe, Destroyer],
    declarations: [BorderifyDirective, StringTruncatePipe, Destroyer]
})
export class SharedModule {}
