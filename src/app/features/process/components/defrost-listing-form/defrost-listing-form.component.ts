import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { defrostDetail } from "src/app/shared/models/defrost.interface";

@Component({
  selector: "defrost-listing-form",
  templateUrl: "./defrost-listing-form.component.html",
  styleUrls: ["./defrost-listing-form.component.scss"],
})
export class DefrostListingFormComponent implements OnInit {
  @Output("onSubmit") submit = new EventEmitter();

  form: FormGroup;

  @Input() lots: defrostDetail;

  minDate = new Date().toISOString();

  maxDate = new Date().getFullYear() + 5;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      dateEnd: [new Date().toISOString()],
      outputHour: [new Date().toISOString()],
    });
  }

  ngOnInit() {}

  onSubmit() {
    const { dateEnd, outputHour } = this.form.value;

    const payload = {
      dateEnd: moment(dateEnd).format("YYYY/MM/DD"),
      outputHour: moment(outputHour).format("HH:mm"),
    };
    this.submit.emit(payload);
  }
}
