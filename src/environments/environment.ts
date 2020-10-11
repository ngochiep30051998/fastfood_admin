// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3000/',
  firebaseConfig: {
    apiKey: 'AIzaSyD1-aktMFLxPHClyjLuUQF5tMVIYW2IGj4',
    authDomain: 'food-4dd37.firebaseapp.com',
    databaseURL: 'https://food-4dd37.firebaseio.com',
    projectId: 'food-4dd37',
    storageBucket: 'food-4dd37.appspot.com',
    messagingSenderId: '589211414820',
    appId: '1:589211414820:web:54b77ea24b3980048883b1',
    measurementId: 'G-XCZRM8W116'
  },
};
