import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TitleHeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: TitleHeaderComponent;
  let fixture: ComponentFixture<TitleHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitleHeaderComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
