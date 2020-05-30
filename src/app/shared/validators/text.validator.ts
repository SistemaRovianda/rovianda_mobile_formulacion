import { AbstractControl, FormControl } from "@angular/forms";

export function textValidator(control: AbstractControl) {
  let regex = /^([a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.]+\s)*[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.]*$/g;

  if (control.value !== undefined && !regex.exec(control.value)) {
    return { noValid: true };
  }
  return null;
}
