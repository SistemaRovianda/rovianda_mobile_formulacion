import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersVerifiedService } from 'src/app/shared/services/users-verified.service';
import { GET_ALL_QUALITY_USERS, SET_ALL_QUALITY_USERS } from './actions';
import { exhaustMap, switchMap } from 'rxjs/operators';
import { qualityUser } from './reducer';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root",
  })
export class QualityUsersEffects{

    constructor(private actions$:Actions,private userService:UsersVerifiedService){
    }


    getAllQualityUsers = createEffect(()=>
    this.actions$.pipe(
        ofType(GET_ALL_QUALITY_USERS),
        exhaustMap((action)=>this.userService.getUsersVerified().pipe(
            switchMap((users:qualityUser[])=>[SET_ALL_QUALITY_USERS({users})])
        )
    )))

}