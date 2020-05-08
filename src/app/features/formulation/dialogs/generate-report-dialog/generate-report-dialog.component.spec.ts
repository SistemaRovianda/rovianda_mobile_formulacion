import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { GenerateReportDialogComponent } from "./generate-report-dialog.component";

describe("ExitLotDialogComponent", () => {
  let component: GenerateReportDialogComponent;
  let fixture: ComponentFixture<GenerateReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateReportDialogComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
