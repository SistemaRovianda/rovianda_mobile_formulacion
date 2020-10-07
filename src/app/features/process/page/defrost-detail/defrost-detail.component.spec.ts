import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { DefrostDetailPageComponent } from "./defrost-detail.component";

describe("DefrostDetailComponent", () => {
  let component: DefrostDetailPageComponent;
  let fixture: ComponentFixture<DefrostDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefrostDetailPageComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DefrostDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
