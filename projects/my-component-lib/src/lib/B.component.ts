import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-b-component',
  template: `
    <p>This is component B with value {{ value }}.</p>
  `,
  styles: []
})
export class BComponent implements OnInit {

  @Input() value: number;

  constructor() { }

  ngOnInit() {
  }

}
