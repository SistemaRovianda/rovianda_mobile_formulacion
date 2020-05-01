import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean;

  @Output("onSubmit") submit = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }

  onSubmit(): void {
    // this.submit.emit(this.form.value);
  }

  shouldDisable(): boolean {
    return this.form.invalid || this.form.pending;
  }
}
