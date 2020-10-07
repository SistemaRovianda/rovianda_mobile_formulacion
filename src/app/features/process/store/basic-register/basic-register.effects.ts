import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { from, of } from "rxjs";
import { catchError, exhaustMap, switchMap } from "rxjs/operators";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { MeatService } from "src/app/shared/services/meat.service";
import { BasicRegisterService } from "src/app/shared/services/process-basic-register.service";
import { ToastService } from "src/app/shared/services/toast.service";
import * as fromBasicRegisterActions from "./basic-register.actions";

@Injectable()
export class BasicRegisterEffect {
  path: string;
  constructor(
    private action$: Actions,
    private meatService: MeatService,
    private basicRegisterService: BasicRegisterService,
    private router: Router,
    private toastService: ToastService,
    private _store: Store<AppStateInterface>
  ) {
    this.path = "/process/recent-records";
  }

  loadDataCurrentProcess = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterSearchInformation),
      exhaustMap((action) =>
        this.basicRegisterService.getDefrostData(action.processId).pipe(
          switchMap((currentProcess) => {
            if (currentProcess.currentProcess == "Descongelamiento") {
              return [
                fromBasicRegisterActions.basicRegisterLoadData({
                  currentProcess,
                }),
                fromBasicRegisterActions.basiRegisterIsSelected({
                  isSelected: true,
                }),
              ];
            } else {
              return [
                fromBasicRegisterActions.basicRegisterLoadData({
                  currentProcess: null,
                }),
                fromBasicRegisterActions.basiRegisterIsSelected({
                  isSelected: false,
                }),
              ];
            }
          }),
          catchError((error) => {
            return of(
              fromBasicRegisterActions.basicRegisterNewProcessFailure({
                error: error.error.msg,
              })
            );
          })
        )
      )
    )
  );

  loadLotsMeatEffect = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterSelectMaterial),
      exhaustMap((action) =>
        this.meatService.getLotsMeat(action.status, action.rawMaterialId).pipe(
          switchMap((lots) => {
            lots.length === 0
              ? this.toastService.presentToastMessageWarning(
                  "Materia prima sin lotes disponibles"
                )
              : this.toastService.presentToastSuccessCustom("Lotes obtenidos");
            return [
              fromBasicRegisterActions.basicRegisterLoadLotsOutputMeat({
                lots,
              }),
            ];
          }),
          catchError((error) => {
            this.toastService.presentToastMessageWarning(
              "Producto seleccionado no encontrado en el congelador"
            );
            return of(
              fromBasicRegisterActions.basicRegisterNewProcessFailure({
                error: error.error.msg,
              })
            );
          })
        )
      )
    )
  );

  regiterNewProcess = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterStartRegisterNewProcess),
      exhaustMap((action) =>
        this.basicRegisterService.basicRegisterDefrost(action.newDefrost).pipe(
          switchMap((result) => {
            this.toastService.presentToastSuccess();
            return [
              fromBasicRegisterActions.basicRegisterLoadResultsNewRegisterProcess(
                { result: true }
              ),
              fromBasicRegisterActions.basicRegisterNewRegisterProcessSucess(),
            ];
          }),
          catchError((error) => {
            this.toastService.presentToastMessageWarning(error.error.msg);
            return of(
              fromBasicRegisterActions.basicRegisterFinishNewRegisterProcess(),
              fromBasicRegisterActions.basicRegisterNewProcessFailure({
                error: error.error.msg,
              })
            );
          })
        )
      )
    )
  );

  registerNewProcessSuccessEffect = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterNewRegisterProcessSucess),
      exhaustMap(() =>
        from(this.router.navigate([this.path])).pipe(
          switchMap((result) =>
            result
              ? [
                  fromBasicRegisterActions.basicRegisterFinishNewRegisterProcess(),
                ]
              : [
                  fromBasicRegisterActions.basicRegisterNewProcessFailure({
                    error: "No autorizado",
                  }),
                ]
          )
        )
      )
    )
  );

  registerDefrostEffect = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterRegisterDefrostProcess),
      exhaustMap((action) =>
        this.basicRegisterService
          .basicRegisterDefrostUpdate(action.processId, action.defrost)
          .pipe(
            switchMap((action) => {
              this.toastService.presentToastSuccess();
              return [
                fromBasicRegisterActions.basicRegisterFinishNewRegisterProcess(),
                fromBasicRegisterActions.basicRegisterRegisterDefrostProcessSuccess(),
              ];
            })
          )
      )
    )
  );

  registerDefrostProcessSuccessEffect = createEffect(() =>
    this.action$.pipe(
      ofType(
        fromBasicRegisterActions.basicRegisterRegisterDefrostProcessSuccess
      ),
      exhaustMap(() =>
        from(this.router.navigate(["/menu"])).pipe(
          switchMap((result) =>
            result
              ? [
                  fromBasicRegisterActions.basicRegisterFinishNewRegisterProcess(),
                ]
              : [
                  fromBasicRegisterActions.basicRegisterNewProcessFailure({
                    error: "No autorizado",
                  }),
                ]
          )
        )
      )
    )
  );
}
