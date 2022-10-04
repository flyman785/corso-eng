import { NgModule } from "@angular/core";
import { BorderifyDirective } from "./directive/borderify.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {StringTruncatePipe} from "./pipes/string-truncate.pipe";

@NgModule({
    imports: [ReactiveFormsModule],
    exports: [BorderifyDirective, ReactiveFormsModule, StringTruncatePipe],
    declarations: [BorderifyDirective, StringTruncatePipe]
})
export class SharedModule {}
