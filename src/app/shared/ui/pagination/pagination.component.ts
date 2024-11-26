import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  
  @Input({required: true}) page?: number;
  @Input({required: true}) size?: number;
  @Input({required: true}) totalPages?: number;
  @Input({required: true}) totalElements?: number;
  @Output() changPage = new EventEmitter<number>();

  onChangPage(pageChange: number){
    this.changPage.emit(pageChange);
  }

}
