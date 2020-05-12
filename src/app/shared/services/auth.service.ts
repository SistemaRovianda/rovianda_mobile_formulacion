import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { AuthenticationUser } from "../models/storeState.interface";
import Auth = firebase.auth.Auth;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string;

  auth: Auth;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyDaoKnC-MSM0b069pawJ5KI1eWlbmng99o",
      authDomain: "rovianda-88249.firebaseapp.com",
    });

    this.auth = firebase.auth();

    this.url = `${endpoint.basePath}`;
  }

  signIn(email: string, password: string): Observable<any> {
    return from(
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) =>
          Promise.all([
            Promise.resolve(userCredentials.user.uid),
            Promise.resolve(userCredentials.user.refreshToken),
          ])
        )
    ).pipe(map(([uid, token]) => ({ uid, token })));
  }

  getUserData(uid: string): Observable<AuthenticationUser> {
    // return this.http.get<User>(`${this.url}/${uid}`);
    let user: AuthenticationUser = {
      email: "formulacion@yopmail.com",
      name: "Damian",
      role: "FORMULATION",
    };
    return Observable.create((observer) => {
      observer.next(user);
      observer.complete();
    });
  }

  isAuth(): boolean {
    return (
      localStorage.getItem("token") != null &&
      localStorage.getItem("role") == "FORMULATION"
    );
  }

  getTokenCurrentUser(): Observable<any> {
    return from(
      this.auth.currentUser
        .getIdToken()
        .then((res) => {
          return Promise.all([Promise.resolve(res)]);
        })
        .catch((error) => {
          return Promise.all([error]);
        })
    ).pipe(map(([currentToken]) => ({ currentToken })));
  }
}
