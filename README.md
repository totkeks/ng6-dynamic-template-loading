# Ng6DynamicTemplateLoading

This is a proof of concept for generating Angular components at run-time from template string like this `<my-component foo="bar"></my-component>`.

Run with
```
npm install
ng build my-component-lib
ng serve
```

It is based on this [stackoverflow answer](https://stackoverflow.com/a/48028892/6374587), but improves two things:

1. select correct wrapper component factory based on the component type instead of always picking index 0, which fails if you import other modules into the wrapper module, e.g. the component module, as it provides its factories to the wrapper module

2. allow for the dynamic compile component to be both the root element and exist multiple times on a page, e.g. when using it inside a documentation framework like [fractal](fractal.build)

Number (1) is solved by this simple line:
`const factory = factories.componentFactories.find(f => f.componentType === wrapperComponent);`

Number (2) is solved by bootstrapping the components ourselves:
```typescript
export class AppModule {
  ngDoBootstrap(app: ApplicationRef) {
    const elements = Array.from(document.querySelectorAll('app-dynamic-compile'));
    elements.forEach(element => {
      console.log('bootstrapping component');
      app.bootstrap(DynamicCompileComponent, element);
    });
  }
}
```

Additionally the component needs to fetch the template string from the html attribute itself because Angular components on the root level have no input binding.
```typescript
constructor(private compiler: Compiler,
    private injector: Injector,
    private moduleRef: NgModuleRef<any>,
    private elementRef: ElementRef
) {

  this.template = this.elementRef.nativeElement.getAttribute('template');
}
```
