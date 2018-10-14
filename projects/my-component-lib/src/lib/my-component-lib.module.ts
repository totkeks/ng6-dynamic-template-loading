import { NgModule } from '@angular/core';
import { AComponent } from './A.component';
import { BComponent } from './B.component';

@NgModule({
  imports: [
  ],
  declarations: [AComponent, BComponent],
  exports: [AComponent, BComponent]
})
export class MyComponentLibModule { }
