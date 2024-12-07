import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommentResponse } from '../../../shared/models';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent {

  @Input({required: true}) comments: CommentResponse[] = [];

}
