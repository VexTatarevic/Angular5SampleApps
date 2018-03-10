// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    apiUrl_Vexit: 'http://localhost:57043/api/',
    apiUrl_Vexit_Guestbook: function () { return environment.apiUrl_Vexit + 'guestbook/'; },
    apiUrl_CryptoCompare: 'https://min-api.cryptocompare.com/data/'
};
