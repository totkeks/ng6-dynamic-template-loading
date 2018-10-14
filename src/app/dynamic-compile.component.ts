import {
  Component, ViewChild, ViewContainerRef, Compiler, Injector, NgModuleRef,
  AfterViewInit, Input, NgModule, ComponentRef, OnDestroy, ElementRef
} from '@angular/core';
import { MyComponentLibModule } from 'my-component-lib';

@Component({
  selector: 'app-dynamic-compile',
  template: `
    <div #container></div>
  `,
  styles: []
})
export class DynamicCompileComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  private template: string;
  private componentRef: ComponentRef<any>;

  constructor(
    private compiler: Compiler,
    private injector: Injector,
    private moduleRef: NgModuleRef<any>,
    private elementRef: ElementRef
  ) {
    this.template = this.elementRef.nativeElement.getAttribute('template');
  }

  ngAfterViewInit() {
    this.createComponent();
  }

  private createComponent() {
    const wrapperComponent = Component({ template: this.template })(class { });
    const wrapperModule = NgModule({
      imports: [MyComponentLibModule],
      declarations: [wrapperComponent]
    })(class { });

    this.compiler.compileModuleAndAllComponentsAsync(wrapperModule).then(factories => {
      const factory = factories.componentFactories.find(f => f.componentType === wrapperComponent);
      this.componentRef = factory.create(this.injector, [], null, this.moduleRef);
      this.container.insert(this.componentRef.hostView);
    });
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
