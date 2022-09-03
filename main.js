require('dotenv').config();
//const DatabaseHelper = require('./src/infra/helpers/DatabaseHelper');
const WhatsAppService = require('./src/services/WhatsAppService')

const { DATABASE_URI } = require('./src/config/Environments');

//DatabaseHelper.open(DATABASE_URI).then(() => {
  const whatsAppService = new WhatsAppService()
  whatsAppService.initialize()
//}).catch((error) => {
 // console.error(error);
//});