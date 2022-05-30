import { Component, OnInit } from '@angular/core';
import { Form, FormInputChangeEventValues } from '../../../ts/types';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss'],
})
export class CustomerAccountComponent implements OnInit {
  form: Form = [
    {
      accessor: 'firstname',
      value: '',
      isValid: true,
      type: 'text',
      label: 'Prénom',
      pattern: /^[a-zA-Z]+$/,
    },
    {
      accessor: 'lastname',
      value: '',
      isValid: true,
      type: 'text',
      label: 'Nom de famille',
      pattern: /^[a-zA-Z]+$/,
    },
    {
      accessor: 'email',
      value: '',
      isValid: true,
      type: 'text',
      label: 'Email',
      pattern:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    },
    {
      accessor: 'address',
      value: '',
      isValid: true,
      type: 'text',
      label: 'Adresse',
    },
    {
      accessor: 'postalCode',
      value: '',
      isValid: true,
      type: 'text',
      label: 'Code postal',
      pattern: /[0-9]{5}/,
    },
    {
      accessor: 'city',
      value: '',
      isValid: true,
      type: 'text',
      label: 'Ville',
      pattern: /^[a-zA-Z]+$/,
    },
    {
      accessor: 'phoneNumber',
      value: '',
      isValid: true,
      type: 'text',
      label: 'Numéro de téléphone',
    },
    {
      accessor: 'civility',
      value: '',
      isValid: true,
      type: 'text',
      label: 'Civilité',
      pattern: /^[a-zA-Z]+$/,
    },
    {
      accessor: 'login',
      value: '',
      isValid: true,
      type: 'text',
      label: "Nom d'utilisateur",
    },
    {
      accessor: 'password',
      value: '',
      isValid: true,
      type: 'text',
      label: 'Mot de passe',
    },
    {
      accessor: 'country',
      value: '',
      isValid: true,
      type: 'text',
      label: 'Pays',
      pattern: /^[a-zA-Z]+$/,
    },
  ];
  isSubmitted: boolean = false;

  constructor() {}

  changeValue(parameters: FormInputChangeEventValues): void {
    const { value, isValid, accessor } = parameters;
    const field = this.form.find((field) => field.accessor === accessor);
    if (field) {
      field.value = value;
      field.isValid = isValid;
    }
  }

  submit(isSubmitted: boolean): void {
    const valid = this.form.every((field) => !!field.value && field.isValid);
    if (valid) this.isSubmitted = isSubmitted;
    else
      this.form
        .filter((field) => !field.value)
        .map((emptyField) => {
          const f = this.form.find((f) => f.accessor === emptyField.accessor);
          if (f) f.isValid = false;
          return f;
        });
  }

  ngOnInit(): void {}
}
