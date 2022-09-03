const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Redis = require('../infra/cache/Redis')

class WhatsAppService {

    constructor(){
        this._client = new Client({authStrategy: new LocalAuth()});
        this._redis = new Redis()
        this._redis.initialize()
    }

    initialize(){
        this._client.initialize();
        this._templateMessages = this._getTemplateMessages()
        this._onQR()
        this._onReady()
        this._onMessage()
    }

    _onReady(){
        this._client.on('ready', () => {
            console.log('Client is ready!');
        });        
    }

    _onQR(){
        this._client.on('qr', qr => {
            qrcode.generate(qr, {small: true});
        });
    }

    _onMessage(){
        this._client.on('message', async (message) => {
            await this._handleMessage(message)
        });
    }

    async _handleMessage(message){
        const redisLastMessageKey = `lm-${message.from}`
        const lastMessage = await this._redis.get(redisLastMessageKey)
        console.log({lastMessage})
        if(!lastMessage){
            this._sendMessageByStep({stepNumber:'0.0', message})
            await this._redis.set({value:'0.0', key:redisLastMessageKey})
            return 
        }

        if(lastMessage && lastMessage==='0.0'){
            const availableOptions=['1.0','2.0','3.0'] // TODO: MELHORAR AVAILABLEoPTIONS

            if(!availableOptions.includes(message.body))
                return this._sendMessage({to:message.from, message:"Por favor, digite uma opção válida."})

            //PROXIMA ETAPA
        }

    }

    _sendMessage({to, message}){
        return this._client.sendMessage(to, message)
    }

    _sendMessageByStep({stepNumber, message}){
        const step = this._getStep(stepNumber)
        const messageDescription = step.message
        const messageOptions = step.options ? this._formatOptionsToText(step.options) : null
        
        this._sendMessage({to:message.from, message:messageDescription})
        .then(()=>{
            if(messageOptions) this._sendMessage({to:message.from, message:messageOptions})
        })
    }

    _formatOptionsToText(options){
        let text='';
        Object.keys(options).forEach(key=>{
            const option = options[key]
            text +=`${key} - ${option}\n`
        })
        return text
    }

    _getStep(step){
        return this._templateMessages.find(templateMessage=>templateMessage.step===step)
    }

    _getAvailableHours(){
        return ['03/09/2022 às 17:00h', '03/09/2022 às 18:00h', '04/09/2022 às 13:00h']
    }

    _getAvailableHoursOptions(step){
        const options = {}
        const availableHours = this._getAvailableHours()
        
        availableHours.forEach((availableHour, index)=>{
            options[`${step}.${index}`] = availableHour
        })

        return options
    }

    _getServicePrices(){
        return [
            {
                title:"Corte de Cabelo",
                duration:"30m",
                price:"35,00"
            },
            {
                title:"Barba",
                duration:"15m",
                price:"20,00"
            },
            {
                title:"Cabelo e Barba",
                duration:"45m",
                price:"50,00"
            }
        ]
    }

    _getServicePricesOptions(step=''){
        const options={}
        const servicePrices = this._getServicePrices()
        servicePrices.forEach((service, index)=>{
            options[`${step}.${index}`] = service
        })

        return options
    }

    _getTemplateMessages(){

        const templateMessages = [
            {
                step:"0.0",
                message:"Olá, Eu sou a Barbára!\nA sua Assistente Virtual.\n\nDigite uma das opções abaixos para começarmos seu atendimento.",
                options:{
                    '1.0':'Quero agendar um horário!',
                    '2.0':'Quero ver a lista de serviços!',
                    '3.0':'Quero conversar com um atendente!'
                },
                hasBack:false
            },
            {
                step:"1.0",
                message:`Que bom que deseja agendar um horário conosco! \nAqui está a lista de horários disponíveis.`,
                options:this._getAvailableHoursOptions(1),
                hasBack:true,
                back:'0.0'
            },
            {
                step:"2.0",
                message:"Ficamos extremamente feliz com o seu interesse em nossos serviços.",
                options:this._getServicePricesOptions(2),
                hasBack:true,
                back:'0.0'
            },
            {
                step:"3.0",
                message:"Aguarde um momento que algum dos nossos atendentes irá te enviar uma mensagem.",
                options:null
            }
        ]
        return templateMessages
    }
}

module.exports = WhatsAppService