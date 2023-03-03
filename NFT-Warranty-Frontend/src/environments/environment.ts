// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_URL: 'http://localhost:3000',
  firebase: {
    projectId: 'nft-warranty-backend',
    appId: '1:245679078417:web:6ac53f67e5490fee03c5b0',
    databaseURL: 'https://nft-warranty-backend-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'nft-warranty-backend.appspot.com',
    locationId: 'asia-southeast1',
    apiKey: 'AIzaSyDwDbhcRUUW5JAtXwPTJxcbmsAVYQFSh30',
    authDomain: 'nft-warranty-backend.firebaseapp.com',
    messagingSenderId: '245679078417',
    measurementId: 'G-DVQ9M1NDE2',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
