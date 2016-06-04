import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Angular2FirebaseAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(Angular2FirebaseAppComponent,[
  FIREBASE_PROVIDERS,
  defaultFirebase('https://angular2fire-board.firebaseio.com/')
]);