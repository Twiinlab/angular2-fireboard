////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  /** @cli-barrel */
];

const packages: any = {};
barrels.forEach((barrelName: string) => {
  packages[barrelName] = { main: 'index' };
});

// Angular Material 2 Packages to load.
  var materialPackages = [
    'core', 'toolbar', 'button', 'card', 'checkbox', 'icon', 'input', 'list', 'progress-bar',
    'progress-circle', 'radio', 'sidenav', 'grid-list', 'slide-toggle', 'tabs'
  ];

materialPackages.forEach(function(item) {
    // All Material 2 components are prefixed with  @angular2-material and use
    // the components name as entry point.
    packages['@angular2-material/' + item] = { 
      main: item + '.js', 
      defaultExtension: 'js' };
});

//Custom Packages
packages['angularfire2'] = {
  defaultExtension: 'js',
  main: 'angularfire2.js'
}

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'firebase': 'vendor/firebase/lib/firebase-web.js',
    'angularfire2': 'vendor/angularfire2',
    '@angular2-material': 'vendor/@angular2-material',
    'main': 'main.js'
  },
  packages: packages
});
