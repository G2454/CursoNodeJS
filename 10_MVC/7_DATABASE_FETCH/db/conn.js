import sequelize from 'sequelize'

const conn = new sequelize('nodemvc', 'root', 'Password',{
    host: 'localhost',
    dialect: 'mysql'
})
try{
 
    conn.authenticate()
    console.log('Conexão com o banco de dados realizada com sucesso')

}

catch(err){
    console.log(err)
}

export default conn