import mysql from 'mysql'

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Password',
    database: 'curso',
})

export default pool