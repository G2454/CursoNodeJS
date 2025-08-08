import mongo from 'mongodb'

const uri = "mongodb://127.0.0.1:27017/testemongodb";


const client = new mongo.MongoClient(uri)

async function run(){
    try{
        await client.connect()
        console.log('Conectando ao MongoDB')
    }catch(err){
        console.log(err)
    }
}

run()

export default client