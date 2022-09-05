const Redis = require("./src/infra/cache/Redis")

const redis = new Redis()
redis.initialize()
.then(async()=>await redis.set({value:'1.0', key:'lm-5511960286810@c.us', timeout:1}))
.then(()=>console.log("Executado"))
