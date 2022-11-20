// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'login-social-proyect',
    appId: '1:586615351758:web:4bc476458b98a5a6ae639f',
    storageBucket: 'login-social-proyect.appspot.com',
    apiKey: 'AIzaSyAWE3d0kBy2bPzX8nIVD97mbTn70vBZhfg',
    authDomain: 'login-social-proyect.firebaseapp.com',
    messagingSenderId: '586615351758',
  },
  production: false,
  hmr: false,
  apiUrl: 'http://127.0.0.1:8000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
