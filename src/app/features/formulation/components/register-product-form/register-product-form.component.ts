import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "register-product-form",
  templateUrl: "./register-product-form.component.html",
  styleUrls: ["./register-product-form.component.scss"],
})
export class RegisterProductFormComponent implements OnInit {
  form: FormGroup;
  @Output("onSubmit") submit = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      productRoviandaId: ["", Validators.required],
      loteId: ["", Validators.required],
      temperature: [""],
      temperatureWater: [""],
      assigmentLot: fb.group({
        newLotId: [""],
        dateEntry: ["", Validators.required],
      }),
      ingredient: [[]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.submit.emit(this.form.value);
  }
}
