import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "title-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class TitleHeaderComponent implements OnInit {
  @Input() titlePath: string;
  @Input() path: string;
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}
