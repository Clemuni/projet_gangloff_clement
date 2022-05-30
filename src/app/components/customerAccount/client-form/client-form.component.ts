import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Form, FormInputChangeEventValues } from '../../../ts/types';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  @Input() form: Form | null = null;

  @Output() valueChangeEventEmitter =
    new EventEmitter<FormInputChangeEventValues>();
  @Output() submitEvent = new EventEmitter<boolean>();

  constructor() {}

  changeValue(values: FormInputChangeEventValues, accessor: string): void {
    const parameters: FormInputChangeEventValues = { ...values, accessor };
    this.valueChangeEventEmitter.emit(parameters);
  }

  submit(): void {
    this.submitEvent.emit(true);
  }

  ngOnInit(): void {}
}
