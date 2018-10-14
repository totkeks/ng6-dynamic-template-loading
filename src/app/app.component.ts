import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title }}</h1>

    <p>First dynamicly compiled component</p>
    <app-dynamic-compile template="<lib-a-component value='test'></lib-a-component>"></app-dynamic-compile>

    <p>Second dynamicly compiled component</p>
    <app-dynamic-compile template="<lib-b-component value='123'></lib-b-component>"></app-dynamic-compile>
  `,
  styles: []
})
export class AppComponent {
  title = 'ng6-dynamic-template-loading';
}
