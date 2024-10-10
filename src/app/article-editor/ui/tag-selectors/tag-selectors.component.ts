import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-tag-selectors',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tag-selectors.component.html',
  styleUrl: './tag-selectors.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TagSelectorsComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagSelectorsComponent implements ControlValueAccessor {
  tags: string[] = [];
  isDisabled = false;

  onChanged!: (value: string[]) => void;
  onTouched!: () => void;

  writeValue(obj: string[]): void {
    this.tags = obj;
  }
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  addTag(event: Event) {
    const htmlInput = event.target as HTMLInputElement;
    const value = htmlInput.value;
    if (this.tags.includes(value)) {
      htmlInput.value = '';
      return;
    }
    this.tags = [...this.tags, value];
    this.onChanged(this.tags);
    this.onTouched(); 
    htmlInput.value = '';
  }

  removeTag(value: string) {
    this.tags = this.tags.filter((item) => item !== value);
    this.onChanged(this.tags);
    this.onTouched();
  }
}
