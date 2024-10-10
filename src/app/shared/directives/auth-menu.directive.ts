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

@Directive({
  selector: '[appAuthMenu]',
  standalone: true,
})
export class AuthMenuDirective {
  private authStore = inject(AuthStore);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private destroy$ = new Subject<void>();

  @Input() set appAuthMenu(isAuthRequired: boolean | undefined) {
    this.viewContainer.clear();
    this.authStore.selectIsAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => {
        this.viewContainer.clear();
        if (isAuthenticated) {
          if (isAuthRequired !== false) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        } else {
          if (isAuthRequired !== true) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
