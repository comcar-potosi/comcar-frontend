import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTemplateName]'
})
export class AppTemplateNameDirective {
  @Input('appTemplateName') name: string | undefined;

  constructor(public templateRef: TemplateRef<any>) {}
}