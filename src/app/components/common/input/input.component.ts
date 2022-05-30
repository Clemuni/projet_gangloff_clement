import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormInputChangeEventValues } from '../../../ts/types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() isValid: boolean = true;
  @Input() pattern?: RegExp | null = null;

  @Output() valueChangeEventEmitter =
    new EventEmitter<FormInputChangeEventValues>();

  constructor() {}

  handleInputChange(event: any) {
    const eventValue = event.target.value;
    let eventIsValid = true;
    if (this.pattern) {
      if (!this.pattern.test(eventValue)) eventIsValid = false;
    }
    const parameters: FormInputChangeEventValues = {
      value: eventValue,
      isValid: eventIsValid,
    };
    this.valueChangeEventEmitter.emit(parameters);
  }

  ngOnInit(): void {}
}
