export const MODULE_SERVICE_NAME = {
  RBAC: 'rbac', CATALOG: 'catalog', SHOPPINGCART: 'shoppingcart',
  MERCHANT: 'merchant', BMS: 'bms', CRM: 'crm', GLOBALDATA: 'globaldata'
}

export const sellerSiteUrl = 'http://localhost/';
export const buyerSiteUrl = 'http://localhost/';
export const stripeApiKey: string = 'pk_test_51MqirNBmP0KkQ9TsV09fqXFmFq5aG4Rp0CYABar4WQq18FjgwVtgTd9vhZuPwfFjTH41J2mWKK8pVvY9iDnujOkT004rs7HxYw';
export const paypalApiKey: string = 'AWu6jH8Pbt3UNLSQLm9bMV5LIAm5fu0TYBF6YUYGNFbUIMiadbW7QgsrVTQuHLyatqL3SNsSKU0IKdLd';
const serviceConfig = {
  serviceProtocal: 'http://',
  serviceHost: 'localhost',
  servicePort: '',
}

export const moduleService = {
  [MODULE_SERVICE_NAME.RBAC]: {
    protocal: serviceConfig.serviceProtocal,
    host: serviceConfig.serviceHost,
    port: '8080',
  },
  [MODULE_SERVICE_NAME.CATALOG]: {
    protocal: serviceConfig.serviceProtocal,
    host: serviceConfig.serviceHost,
    port: '8090',
  },
  [MODULE_SERVICE_NAME.SHOPPINGCART]: {
    protocal: serviceConfig.serviceProtocal,
    host: serviceConfig.serviceHost,
    port: '8100',
  },
  [MODULE_SERVICE_NAME.MERCHANT]: {
    protocal: serviceConfig.serviceProtocal,
    host: serviceConfig.serviceHost,
    port: '8110',
  },
  [MODULE_SERVICE_NAME.BMS]: {
    protocal: serviceConfig.serviceProtocal,
    host: serviceConfig.serviceHost,
    port: '8190',
  },
  [MODULE_SERVICE_NAME.CRM]: {
    protocal: serviceConfig.serviceProtocal,
    host: serviceConfig.serviceHost,
    port: '8120',
  },
  [MODULE_SERVICE_NAME.GLOBALDATA]: {
    protocal: serviceConfig.serviceProtocal,
    host: serviceConfig.serviceHost,
    port: '8079',
  }
}