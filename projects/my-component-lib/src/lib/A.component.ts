import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-a-component',
  template: `
    <p>This is component A with value {{ value }}.</p>
  `,
  styles: []
})
export class AComponent implements OnInit {

  @Input() value: string;

  constructor() { }

  ngOnInit() {
  }

}
