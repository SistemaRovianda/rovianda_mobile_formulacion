import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { AddIngredientPageComponent } from "./add-ingredient.page";

describe("AddIngredientComponent", () => {
  let component: AddIngredientPageComponent;
  let fixture: ComponentFixture<AddIngredientPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddIngredientPageComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddIngredientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
