const redis = require("redis");
const REDIS_URL = "localhost:6379";
const client = redis.createClient(
    {url: 'localhost:6379',}
);
const session = "002";
const email = "Holi@canoli.pat";
const passwd = "12345";

client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Successfully connected to redis"));

async function logSessionToRedis(){
    console.log("hi :D " + email)
    (async () => {
        await client.connect();
      })();
    await client.set(session,email)
    
}
logSessionToRedis();
