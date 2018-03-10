export const environment = {
    production: true,
    apiUrl_Vexit: 'http://www.vexit.com/api/',
    apiUrl_Vexit_Guestbook: function () { return environment.apiUrl_Vexit + 'guestbook/'; },
    apiUrl_CryptoCompare: 'https://min-api.cryptocompare.com/data/'
};
