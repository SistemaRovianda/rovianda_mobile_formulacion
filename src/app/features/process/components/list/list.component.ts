import { Component, Input, OnInit } from "@angular/core";
import { defrostList } from "src/app/shared/models/defrost.interface";

@Component({
  selector: "defrost-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  @Input() item: defrostList;
  constructor() {}

  ngOnInit() {}
}
