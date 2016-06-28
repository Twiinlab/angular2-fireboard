import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { Angular2FirebaseAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(Angular2FirebaseAppComponent,[
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyCBzWF2AsSDm491NsJmm_iJERp7LEMy3wE",
    authDomain: "angular2-fireboard.firebaseapp.com",
    databaseURL: "https://angular2-fireboard.firebaseio.com",
    storageBucket: "angular2-fireboard.appspot.com",
  }),
  [provide(Window, {useValue: window})]
]);