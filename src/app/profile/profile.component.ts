import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { ProfileStore } from './profile.store';
import { AsyncPipe, NgClass } from '@angular/common';
import { ProfileResponse } from '../shared/models';
import { GetArticleQueryParams } from '../shared/services';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../shared/constants';
import { ArticleToogleComponent } from './ui/article-toogle/article-toogle.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, NgClass, ArticleToogleComponent, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(ProfileStore)],
})
export class ProfileComponent {
  readonly profileStore = inject(ProfileStore);

  @Input() set username(value: string) {
    this.profileStore.getProfileByUsername(value);
  }

  toggleFollow(profile: ProfileResponse) {
    this.profileStore.toggleFollow(profile);
  }
}
