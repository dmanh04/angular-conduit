import {
  DestroyRef,
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthStore } from '../store';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';

@Directive({
  selector: '[appAuthMenu]',
  standalone: true,
  hostDirectives: [NgIf]
})
export class AuthMenuDirective {
  private authStore = inject(AuthStore);
  private destroy$ = new Subject<void>();
  readonly ngIf = inject(NgIf);

  @Input() set appAuthMenu(isAuthRequired: boolean | undefined) {
    this.authStore.selectIsAuthenticated$
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(isAuth => {
      if(isAuthRequired === undefined){
        this.ngIf.ngIf = true;
      }
      else{
        if(!isAuthRequired){
          this.ngIf.ngIf = isAuthRequired === isAuth;
        }
        else{
          this.ngIf.ngIf = isAuth;
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
