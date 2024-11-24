import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  
  @Input({required: true}) page$!: Observable<number>;
  @Input({required: true}) size$!: Observable<number>;
  @Input({required: true}) totalPages$!: Observable<number>;
  @Input({required: true}) totalElements$!: Observable<number>;
  @Output() changPage = new EventEmitter<number>();

  onChangPage(pageChange: number){
    this.changPage.emit(pageChange);
  }

}
