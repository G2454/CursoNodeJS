import {DataTypes} from 'sequelize';
import conn from '../db/conn.js'
import User from './User.js'

const db = conn
const Address = db.define('Address', {
    street:{
        type: DataTypes.STRING,
        required: true
    },
    number:{
        type: DataTypes.STRING,
        required: true
    },
    city:{
        type: DataTypes.STRING,
        required: true
    }

})
User.hasMany(Address)
Address.belongsTo(User)

export default Address
