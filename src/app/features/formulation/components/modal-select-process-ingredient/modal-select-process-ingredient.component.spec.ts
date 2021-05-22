import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalSelectProcessIngredientComponent } from './modal-select-process-ingredient.component';

describe('ModalSelectProcessIngredientComponent', () => {
  let component: ModalSelectProcessIngredientComponent;
  let fixture: ComponentFixture<ModalSelectProcessIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectProcessIngredientComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSelectProcessIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
