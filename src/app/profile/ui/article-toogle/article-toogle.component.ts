import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileResponse } from '../../../shared/models';

interface Tab {
  link: string;
  title: string;
}

@Component({
  selector: 'app-article-toogle',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './article-toogle.component.html',
  styleUrl: './article-toogle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleToogleComponent implements OnInit{

  @Input({required: true}) profileResponse!: ProfileResponse;
  
  tabList: Tab[] = [];

  ngOnInit(): void {
    this.tabList = [
      {
        link: `/profile/${this.profileResponse.username}`,
        title: 'My Articles',
      },
      {
        link: `/profile/${this.profileResponse.username}/favorites`,
        title: 'Favorites Articles',
      },
    ];
  }

}
