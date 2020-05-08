import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PrintReportPageComponent } from "./print-report.page";

describe("PrintReportComponent", () => {
  let component: PrintReportPageComponent;
  let fixture: ComponentFixture<PrintReportPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintReportPageComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PrintReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
