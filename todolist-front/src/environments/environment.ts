// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ELEMENT_DATA: [
    { id: 0, title: 'US 1 : List my TODOs', description: "As a user I would like to list my current todos" },
    { id: 1, title: 'US 2 : Change a TODO state', description: "As a user I would like to change a todo state by checking a \"box\"" },
    {
      id: 2, title: 'US 3 : Detail a TODO', description: "As a user I would like to display one of my todo in a separate or dedicated view.This todo will contain its title and a description(which is a new information not shown in the previous view)."
    },
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
