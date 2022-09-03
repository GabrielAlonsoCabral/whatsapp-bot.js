const { createClient }  = require('redis');

class Redis{
    constructor(){
        this._client = createClient({
            url: `redis://localhost:6379`    
        })        
    }

    async initialize(){
        await this._client.connect()
        this._onError()
    }

    _onError(){
        this._client.on('error',error=>console.error(error))
    }

    async set({value='', key='none', timeout=60*15}){
        await this._client.set(key, value);
        this._client.expire(key, timeout)
    }

    async get(key='none'){
        return await this._client.get(key)
    }
}
module.exports= Redis