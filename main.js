require('dotenv').config();
const WhatsAppService = require('./src/services/WhatsAppService')

const whatsAppService = new WhatsAppService()
whatsAppService.initialize()