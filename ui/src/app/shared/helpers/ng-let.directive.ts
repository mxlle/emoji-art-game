import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface NgLetContext {
  $implicit: any;
  ngLet: any;
}

@Directive({
  selector: '[ngLet]',
})
export class NgLetDirective {
  @Input()
  set ngLet(value: any) {
    this._viewContainerRef.clear();
    this._viewContainerRef.createEmbeddedView(this._templateRef, {
      $implicit: value,
      ngLet: value,
    });
  }

  constructor(private _viewContainerRef: ViewContainerRef, private _templateRef: TemplateRef<NgLetContext>) {}
}
