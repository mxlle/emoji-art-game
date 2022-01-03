import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface NgLetContext<T> {
  $implicit?: T;
  ngLet?: T;
}

@Directive({
  selector: '[ngLet]',
})
export class NgLetDirective<T> {
  private _context: NgLetContext<T> = {};
  private _hasView: boolean = false;

  @Input()
  set ngLet(value: T) {
    this._context.ngLet = value;
    this._context.$implicit = value;
    if (!this._hasView) {
      this._viewContainerRef.createEmbeddedView(this._templateRef, this._context);
      this._hasView = true;
    }
  }

  constructor(private _viewContainerRef: ViewContainerRef, private _templateRef: TemplateRef<NgLetContext<T>>) {}
}
