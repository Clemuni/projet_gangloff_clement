import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config: any = {
      required: 'Requis',
      passwordNotCorresponding: "Les mots de passes doivent correspondre",
      incorrectEmail: "Le champ doit être un email valide",
    };

    return config[validatorName];
  }

  static passwordsValidator(control: FormControl) {
    let pass = control.get("password");
    let confirm = control.get("confirm_password");
    if (pass?.value !== confirm?.value) {
      pass?.setErrors({ passwordNotCorresponding: true });
      confirm?.setErrors({ passwordNotCorresponding: true });
      return { passwordNotCorresponding: true };
    }
    else if (pass?.value.trim() === "" || confirm?.value.trim() === "") {
      return { required: true };
    }
    else {
      pass?.setErrors(null);
      confirm?.setErrors(null);
      return null;
    }
  }

  static emailValidator(control: FormControl) {
    const email_regex : RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return control.value.match(email_regex) ? null : { incorrectEmail: true };
  }
}
