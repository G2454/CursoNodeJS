import sequelize from 'sequelize'

const pool = new sequelize('sequelize', 'root', 'Password',{
    host: 'localhost',
    dialect: 'mysql'
})
try{
    pool.authenticate()
    console.log('Conexão com o banco de dados realizada com sucesso')
}

catch(err){
    console.log(err)
}

export default pool