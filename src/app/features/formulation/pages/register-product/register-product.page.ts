import { Component, OnInit } from "@angular/core";
import { Formulation } from "src/app/shared/models/formulation.interface";

@Component({
  selector: "register-product",
  templateUrl: "./register-product.page.html",
  styleUrls: ["./register-product.page.scss"],
})
export class RegisterProductPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onSubmit(payload: Formulation) {}
}
