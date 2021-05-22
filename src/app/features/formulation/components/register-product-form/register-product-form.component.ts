import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { Store, select } from "@ngrx/store";
import { Observable, from } from "rxjs";
import { AlertController, ModalController } from "@ionic/angular";
import { AddIngredientComponent } from "../../dialogs/add-ingredient/add-ingredient.component";
import { Lot } from "src/app/shared/models/lot.interface";
//import { SELECT_LOTS } from "../../store/lots/lots.selectors";
import { noWhiteSpace } from "src/app/shared/validators/white-space.validator";
import { SELECT_FORMULARION_REGISTER_SAVE } from "../../store/register-formulation/register-formulation.selector";
import { registerNewRegistration } from "../../store/register-formulation/register-formulation.action";
import * as moment from "moment";
import { Storage } from "@ionic/storage";
import { productsRovianda } from "../../store/productsRovianda/reducer";
import {
  GET_ALL_PRODUCTS_ROVIANDA,
  GET_INGREDIENTS_PRODUCT_ROVIANDA,
} from "../../store/productsRovianda/actions";
import { GET_PRODUCTS_ROVIANDA_STORE } from "../../store/productsRovianda/selectors";
import { OutputsMeat } from "src/app/shared/models/outputsMeat";
import { GET_ALL_OUTPUTS_MEAT } from "../../store/lotsMeat/actions";
import { GET_LOTS_MEAT_STORE } from "../../store/lotsMeat/selector";
import { GET_ALL_QUALITY_USERS } from "../../store/quality-user/actions";
import { qualityUser } from "../../store/quality-user/reducer";
import { GET_QUALITY_USERS_STORE } from "../../store/quality-user/selectors";
import { ingredientsOfProductRovianda } from "../../store/ingredients-product-rovianda/reducer";
import { GET_INGREDIENTS_PRODUCT_ROVIANDA_STORE } from "../../store/ingredients-product-rovianda/selector";
import { lotsDrief } from "../../store/lotsDrief/reducer";
import {
  GET_ALL_INGREDIENTS_AVAILABLES,
  SET_INGREDIENTS,
} from "../../store/ingredients-product-rovianda/actions";
import { SELECT_USER_UID } from "src/app/features/landing/store/authentication/authentication.selectors";
import { GET_LOTS_DRIEF_STORE } from "../../store/lotsDrief/selectors";
import { processIngredient } from "src/app/shared/models/process.interface";
import { getProcessIngredients } from "../../store/ingredients/ingredients.actions";
import { SELECT_PROCESS_INGREDIENTS } from "../../store/ingredients/ingredients.selectors";
import { ModalSelectProcessIngredientComponent } from "../modal-select-process-ingredient/modal-select-process-ingredient.component";

@Component({
  selector: "register-product-form",
  templateUrl: "./register-product-form.component.html",
  styleUrls: ["./register-product-form.component.scss"],
})
export class RegisterProductFormComponent implements OnInit {
  form: FormGroup;
  loadingIngredients: boolean;
  productsRovianda$: Observable<productsRovianda[]>;
  ingredientsOfProductRovianda$: Observable<ingredientsOfProductRovianda[]>;
  lotsMeat$: Observable<OutputsMeat[]>;
  lotsDrief$: Observable<lotsDrief[]>;
  lots$: Observable<Lot[]>;
  qualityUsers$: Observable<qualityUser[]>;
  nameElaborated: Observable<string>;
  uidElaborated: Observable<String>;
  lotsFormArray: FormArray = new FormArray([]);
  userId: string;
  ingredients: ingredientsOfProductRovianda[];

  selected_values = [];

  @Output("onSubmit") submit = new EventEmitter();

  customOptions: Record<string, string> = {
    header: "Selecciona uno o máx. cinco lotes",
    cssClass: "ion-select-max-height",
  };

  processIngredients:processIngredient[]=[];
  processIngredientsTaked:processIngredient[]=[];
  constructor(
    private fb: FormBuilder,
    private _store: Store<AppStateInterface>,
    private _modalCtrl: ModalController,
    private _storage: Storage,
    private _alertCtrl:AlertController
  ) {
    this.loadingIngredients = true;
    this.mapIngredients=new Map();
    //this.catalogLots$ = this._store.pipe(select(SELECT_CATALOG_LOTS));

    this.form = fb.group({
      productRoviandaId: ["", [Validators.required]],
      temperature: ["", [Validators.required, noWhiteSpace]],
      temperatureWater: ["", [Validators.required, noWhiteSpace]],
      verifitId: ["", Validators.required],
      date: [
        { value: moment(new Date()).format("DD/MM/YYYY"), disabled: true },
      ],
      makeId: [""],
      lotsDefrost: ["", [Validators.required]],
      ingredient: [[]],
      processIngredient:[false],
      processNormal:[false],
      processIngredienteSelected:[null]
    });
  }

  selectModeProcess(mode:string){
    if(mode=="normal"){
      
      if(this.processIngredient.value==true){
        this.processIngredient.setValue(false);
        this.processNormal.setValue(true);
      }
    }else if(mode=="ingredient"){
      
      if(this.processNormal.value==true){
        this.processNormal.setValue(false);
        this.processIngredient.setValue(true);
      }
    }
  }

  async processTypeRequiredModal(title:string,body:string,index?:number){
    let buttons=[];
    if(index!=null){
      buttons= [
        {
          text: "Aceptar",
          cssClass: "btn-confirm-dialog",
          
        },{
          text: "Borrar",
          handler: () => {
            this.selectedProcessIngredientSlice(index)
        }
      }
      ];
    }else{
      buttons= [
        {
          text: "Aceptar",
          cssClass: "btn-confirm-dialog",
          
        },
      ]
    }
    const alert =  this._alertCtrl.create({
      header: title,
      message: body,
      buttons
    });
    (await alert).present();
  }
  mapIngredients:Map<number,string>;
  ngOnInit() {
    this._store.dispatch(GET_ALL_PRODUCTS_ROVIANDA());
    this._store.dispatch(GET_ALL_OUTPUTS_MEAT());
    this._store.dispatch(GET_ALL_QUALITY_USERS());
    this._store.dispatch(GET_ALL_INGREDIENTS_AVAILABLES());
    this.productsRovianda$ = this._store.pipe(
      select(GET_PRODUCTS_ROVIANDA_STORE)
    );
    
    this.lotsMeat$ = this._store.pipe(select(GET_LOTS_MEAT_STORE));
    this.qualityUsers$ = this._store.pipe(select(GET_QUALITY_USERS_STORE));
    this.ingredientsOfProductRovianda$ = this._store.pipe(
      select(GET_INGREDIENTS_PRODUCT_ROVIANDA_STORE)
    );
    this.lotsDrief$ = this._store.pipe(select(GET_LOTS_DRIEF_STORE));
    this.ingredientsOfProductRovianda$.subscribe((lots) => {
  
      this.ingredients = lots;
      this.createLotsFormArray(lots.length);
      for(let ingre of this.ingredients){
        if(!this.mapIngredients.get(ingre.productId)){
          this.mapIngredients.set(ingre.productId,ingre.description);
        }
      }
    });
    this._store.select(SELECT_FORMULARION_REGISTER_SAVE).subscribe((res) => {
      if (res) {
        this.form.reset();
        this.lotsFormArray = new FormArray([]);
        this._store.dispatch(registerNewRegistration());
        this._store.dispatch(SET_INGREDIENTS({ ingredients: [] }));
        this._store.dispatch(GET_ALL_PRODUCTS_ROVIANDA());
        this._store.dispatch(GET_ALL_OUTPUTS_MEAT());
        this._store.dispatch(GET_ALL_QUALITY_USERS());
        this._store.dispatch(GET_ALL_INGREDIENTS_AVAILABLES());
      }
    });

    // this._store
    //   .select(SELECT_INGREDIENTS_BY_PRODUCT_LOADING)
    //   .subscribe((loading) => {
    //     this.loadingIngredients = loading;
    //   });

    // this.ingredients$ = this._store.select(SELECT_INGREDIENTS_CHECKED);

    this.form.get("productRoviandaId").valueChanges.subscribe((productId) => {
      this._store.dispatch(getProcessIngredients({productId}));
      this._store.dispatch(GET_INGREDIENTS_PRODUCT_ROVIANDA({ productId }));
    });
    this._store.pipe(select(SELECT_USER_UID)).subscribe((uid) => {
      this.userId = uid;
      console.log(uid);
    });

    this._store.pipe(select(SELECT_PROCESS_INGREDIENTS)).subscribe((processIngredients:processIngredient[])=>{
        this.processIngredients= processIngredients.map(x=>({...x,assigned:false}));
        this.processIngredientsTaked=[];
    });
    // //this.lots$ = this._store.select(SELECT_LOTS);
    // this.lots$.subscribe((res) => {
    //   console.log("RES",res);
    //   if (res.length) this.createLotsFormArray(res.length);
    // });

    this.nameElaborated = from(
      this._storage.get("currentUser").then((res) => Promise.resolve(res))
    );

    this._storage.get("uid").then((res) => {
      console.log("res uid", res);
      this.form.get("makeId").setValue(res);
      return Promise.resolve(res);
    });

    // this.usersVerified$ = this._store.select(usersVerifiedSelector);
  }

  onSelectProcessIngredient(event:any){
    console.log("Selected: "+event.target.value);
    let processFormule:processIngredient=event.target.value;
    if(processFormule!=undefined){
    this.showInfo(processFormule,null);
    }
  }

  showInfo(processFormule:processIngredient,index:number){
    let bodyContent="";
    for(let lot of processFormule.ingredients){
      bodyContent+=`Lote: ${lot.lotId} Materia Prima: ${lot.rawMaterial}\n`;
    }
    this.processTypeRequiredModal("Este proceso/ingrediente contiene: ",bodyContent,index);
  }

  // agregar(){
  //   let processIngredientSelected:processIngredient = this.form.get("processIngredienteSelected").value;
  //   if(processIngredientSelected!=null){
  //     console.log(JSON.stringify(processIngredientSelected));
  //     let idsAlreadedAdded = this.processIngredientsTaked.map(x=>x.processId);
  //     if(!idsAlreadedAdded.includes(processIngredientSelected.processId)){
  //       this.processIngredientsTaked.push(processIngredientSelected);
  //       idsAlreadedAdded=this.processIngredientsTaked.map(x=>x.processId);
  //       this.processIngredients=this.processIngredients.filter(x=>!idsAlreadedAdded.includes(x.processId));
  //     }
  //   }
  //   if(this.processIngredientsTaked.length){
  //     this.processNormal.setValue(true);
  //     this.processIngredient.setValue(false);
  //   }
  // }

  selectedProcessIngredientSlice(index){
    let item = this.processIngredientsTaked[index];
    for(let ingre of this.processIngredientsTaked){
      if(ingre.processId==item.processId){
        ingre.assigned=false;
      }
    }
    this.processIngredientsTaked.splice(index,1);
  }


  onSubmit() {
    if(this.processNormal.value == false && this.processIngredient.value==false){
        this.processTypeRequiredModal("Error","Debes de seleccionar el tipo de proceso");
    }else{
    this.form
      .get("ingredient")
      .setValue(this.getLotsIdWithIngredientsId(this.lotsFormArray.value));

    // this.form.get("makeId").setValue(this.userId);

    this.form.get("lotsDefrost").setValue(this.selected_values);
    const f = {
      processIngredients: this.processIngredients.filter(x=>x.assigned==true),
      ...this.form.value,
      date: moment(new Date()).format("DD/MM/YYYY"),
    };
    console.log("Formulario:"+JSON.stringify(f));
    this.submit.emit(f);
  }
  }

  getLotsIdWithIngredientsId(values: any) {
    return values.map((x, index) => {
      return {
        lotRecordId: x,
        ingredientId: this.ingredients[index].productId,
      };
    });
  }

  async openModal() {
    const modal = await this._modalCtrl.create({
      component: AddIngredientComponent,
      cssClass: "add-ingredientes-modal",
    });

    await modal.present();
  }

  async openModalProcessIngredients() {
    if(this.processIngredients.length){
    const modal = await this._modalCtrl.create({
      component: ModalSelectProcessIngredientComponent,
      componentProps:{
        processIngredients:this.processIngredients,
        productId: this.productRoviandaId.value
      },
      backdropDismiss:false
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log("Data readed: "+data.data);
      if(data.data.length){
        this.processIngredients=data.data;
        this.processIngredientsTaked=this.processIngredients.filter(x=>x.assigned==true);
      }else{
        let alreadyTaked = this.processIngredientsTaked.map(x=>x.processId);
        this.processIngredients=this.processIngredients.map(x=>{
          return {
            ...x,
            assigned: alreadyTaked.includes(x.processId)
          }
        });
      }
    });
    await modal.present();
  }
  }

  createLotsFormArray(size?: number) {
    this.lotsFormArray = new FormArray([]);
    for (let i = 0; i <= size - 1; i++) {
      this.lotsFormArray.push(new FormControl("", Validators.required));
    }
  }

  get productRoviandaId() {
    return this.form.get("productRoviandaId");
  }

  get lotsDefrost() {
    return this.form.get("lotsDefrost");
  }

  get temperature() {
    return this.form.get("temperature");
  }

  get temperatureWater() {
    return this.form.get("temperatureWater");
  }

  get newLotId() {
    return this.form.get("assignmentLot").get("newLotId");
  }

  get dateEntry() {
    return this.form.get("assignmentLot").get("dateEntry");
  }

  get verifitId() {
    return this.form.get("verifitId");
  }

  get processNormal(){
    return this.form.get("processNormal");
  }

  get processIngredient(){
    return this.form.get("processIngredient");
  }

  onSelect() {
    const values: [] = this.lotsDefrost.value;

    console.log(this.selected_values);

    if (this.selected_values.length <= 5) {
      this.selected_values = values.map((value: any) => {
        return {
          lotId: value.lotId,
          defrostId: value.defrostId,
        };
      });

      //do somthing
    } else {
      console.log(this.selected_values.length);
      this.lotsDefrost.setErrors({ maxLength: true });
    }
  }
}
