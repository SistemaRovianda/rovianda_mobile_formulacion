import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { DefrostListingPageComponent } from "./defrost-listing.component";

describe("DefrostListingComponent", () => {
  let component: DefrostListingPageComponent;
  let fixture: ComponentFixture<DefrostListingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefrostListingPageComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DefrostListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
