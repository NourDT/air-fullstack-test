// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'https://oxst6ge78f.execute-api.ap-southeast-1.amazonaws.com/dev',
  api_key: 'cxp3uSUfkx6i6MVAohlIV85GfsnlcVsI6aK0Ltb5',
  awsconfig: {
    aws_project_region: 'ap-southeast-1',
    aws_appsync_graphqlEndpoint:
      'https://vdpj3nkxw5eknhbbrv34hgmlxa.appsync-api.ap-southeast-1.amazonaws.com/graphql',
    aws_appsync_region: 'ap-southeast-1',
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: 'da2-4uxtixgpbfgcbkc5uzoyuxfxia',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
