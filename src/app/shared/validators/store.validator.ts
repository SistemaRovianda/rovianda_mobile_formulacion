import { ValidationErrors, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { error } from "protractor";
import { map, take } from "rxjs/operators";

export class StoreValidator {
  static hasStoreError<T>(error: Observable<T>, errorName: string) {
    return (
      _: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>
      error.pipe(
        take(2),
        map((errors) => (!!errors ? { [errorName]: errors } : null))
      );
  }
}
