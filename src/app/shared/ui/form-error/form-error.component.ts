import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent{
  
  @Input({required: true}) errorStoreMessage$!: Observable<string[]>;

}
