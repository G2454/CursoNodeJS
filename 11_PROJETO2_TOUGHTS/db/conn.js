import Sequelize from 'sequelize'


const conn = new Sequelize('toughts2', 'root', 'Password',{
    host: 'localhost',
    dialect: 'mysql'
})

try{
    conn.authenticate()
    console.log('Conectado com sucesso!')
}catch(err){
    console.log(`Não foi possível conectar: ${err}`)
}

export default conn