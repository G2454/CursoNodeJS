import mongoose from 'mongoose'

const uri = "mongodb://127.0.0.1:27017/testemongodb";


async function main(){
    await mongoose.connect(uri)
    console.log("Conectou ao MongoDB com Mongoose")
}

main().catch((err)=>console.log(err))

export default mongoose