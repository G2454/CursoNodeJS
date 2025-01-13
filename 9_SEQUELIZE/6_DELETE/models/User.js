import {DataTypes} from 'sequelize';
import conn from '../db/conn.js'

const db = conn

const User = db.define('User', {  
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation:{
        type: DataTypes.STRING,
        required: true
    },
    newsletter:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
 })

 export default User
