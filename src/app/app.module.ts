import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicCompileComponent } from './dynamic-compile.component';
import { MyComponentLibModule } from 'my-component-lib';

@NgModule({
  declarations: [
    AppComponent,
    DynamicCompileComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
    DynamicCompileComponent
  ]
})
export class AppModule {
  ngDoBootstrap(app: ApplicationRef) {
    const elements = Array.from(document.querySelectorAll('app-dynamic-compile'));
    elements.forEach(element => {
      console.log('bootstrapping component');
      app.bootstrap(DynamicCompileComponent, element);
    });
  }
}
