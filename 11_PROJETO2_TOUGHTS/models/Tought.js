import { DataTypes } from "sequelize";
import conn from '../db/conn.js'
import User from "./User.js";

const db = conn

const Tought = db.define('Tought',{
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        require:true
    },

})

Tought.belongsTo(User)
User.hasMany(Tought)

export default Tought