import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { RegisterProductPageComponent } from "./register-product.page";

describe("RegisterProductComponent", () => {
  let component: RegisterProductPageComponent;
  let fixture: ComponentFixture<RegisterProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterProductPageComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
