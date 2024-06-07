import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {

  @Input() public appHasRole: Array<string> = [];

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>, private storageServices: StorageService) {

  }
  ngOnInit(): void {
    const itemFound = this.storageServices.getUser().authorities.findIndex(
      (element: string) => this.appHasRole.indexOf(element) !== -1
    );

    if (itemFound < 0) {
      this.viewContainerRef.clear();
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
