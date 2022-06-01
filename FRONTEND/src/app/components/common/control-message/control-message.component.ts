import { Component, Input } from '@angular/core';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-control-message',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.scss'],
})
export class ControlMessageComponent {
  errorMessage: string = '';
  @Input() control: any;
  constructor() {}

  get errorMessages() {
    for (let propertyName in this.control?.errors) {
      if (this.control?.errors.hasOwnProperty(propertyName) && this.control?.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control?.errors[propertyName]);
      }
    }
    return null;
  }
}
