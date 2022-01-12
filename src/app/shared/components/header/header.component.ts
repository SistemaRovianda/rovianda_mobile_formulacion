import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "title-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class TitleHeaderComponent implements OnInit {
  @Input() titlePath: string;
  @Input() path: string;
  @Input() title: string;

  constructor(private router:Router) {}

  ngOnInit() {}
  navigate(){
    console.log("PATH: "+this.path);
    this.router.navigateByUrl(this.path||"/");
  }
}
