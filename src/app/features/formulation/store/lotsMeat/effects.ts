import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LotService } from 'src/app/shared/services/lots.service';
import { GET_ALL_OUTPUTS_MEAT, SET_OUTPUTS_MEAT } from './actions';
import {  switchMap, exhaustMap } from 'rxjs/operators';
import { OutputsMeat } from 'src/app/shared/models/outputsMeat';

@Injectable({
    providedIn: "root",
  })
export class LotsMeatEffects {

    constructor(private actions$:Actions,private lotsService:LotService){}


    getAllOutputsMeat=createEffect(()=>
    this.actions$.pipe(
        ofType(GET_ALL_OUTPUTS_MEAT),
        exhaustMap(()=>this.lotsService.getCatalogLots().pipe(
            switchMap((outputsMeat:OutputsMeat[])=>[
                SET_OUTPUTS_MEAT({outputsMeat})
            ])
        ))
    ))

}