import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommentResponse } from '../../../shared/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent {

  @Input({required: true}) comments: CommentResponse[] = [];

}
