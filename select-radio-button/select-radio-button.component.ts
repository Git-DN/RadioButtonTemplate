import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-select-radio-button',
  standalone: true,
  imports: [FormsModule, CommonModule, TooltipModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectRadioButtonComponent),
      multi: true,
    },
  ],
  templateUrl: './select-radio-button.component.html',
  styleUrl: './select-radio-button.component.scss',
})
export class SelectRadioButtonComponent implements ControlValueAccessor {
  @Input() groupName: string = '';
  @Input() label: any = '';
  @Input() valueName: any = '';
  @Input() tooltip: string = '';

  @ViewChild('rdbtn') rdbtn!: ElementRef;

  private value!: string;

  constructor() {}

  onChange: any = () => {};
  onTouch: any = () => {};

  onInputChange(val: any) {
    this.onChange(this.valueName);
  }

  writeValue(value: any): void {
    this.value = value;
    this.updateChecked();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.updateChecked();
  }

  updateChecked(): void {
    setTimeout(() => {
      const checked = this.value == this.valueName;
      if (this.rdbtn) {
        this.rdbtn.nativeElement.checked = checked;
      }
    }, 0);
  }
}
