import { raw } from "mysql2";
import Tought from "../models/Tought.js";
import User from "../models/User.js";
import { Sequelize, Op } from "sequelize";

class ToughtsController{
    
    static async showToughts(req, res){

        let search = ''

        if(req.query.search){
            search = req.query.search
        }

        let order = 'DESC'

        if(req.query.order === 'old'){
            order = 'ASC'
        }else{
            order = 'DESC'
        }
        
        const toughtsData = await Tought.findAll({
            include: User,
            where:{
                title: {[Op.like]: `%${search}%`}
            },
            order:[['createdAt', order]],
        })

        const toughts = toughtsData.map((result) => result.get({
            plain:true
        }))

        let toughtsQty = toughts.length

        if(toughtsQty === 0){
            toughtsQty = false
        }

        res.render('toughts/home', {toughts, search, toughtsQty})
    }
    
    static async dashboard(req,res){

        const userId = req.session.userId

        const user = await User.findOne({
            where:{
                id: userId
            },
            include: Tought,
            plain:true
        })

        if(!user){
            res.redirect('/login')
        }
        const toughts = user.Toughts.map((result)=>{
            return result.dataValues})

        let emptyToughts = false

        if(toughts.length === 0){
            emptyToughts = true
        }

        console.log(toughts.length)

        res.render('toughts/dashboard', { toughts, emptyToughts })
    }

    static createTought(req,res){
        res.render('toughts/create')
    }

    static async createToughtSave(req, res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userId,
        }
        
        try{
            await Tought.create(tought)
            req.flash('message', 'Pensamento criado com sucesso')

            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
        })
        }catch(err){
            console.log(err)
        }
        }

    static async removeTought(req,res){

        const id = req.body.id
        const UserId = req.session.userId

        try{
            await Tought.destroy({where: {id:id, UserId:UserId}})
            req.flash('message', 'Pensamento removido com sucesso!')
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })
        }catch(err){
            console.log(err)
        }
    }

    static async updateTought(req, res){
        const id = req.params.id

        const tought = await Tought.findOne({where:{id :id}, raw: true})

        res.render('toughts/edit', {tought})
    }

    static async updateToughtSave(req, res){
        const id = req.body.id

        const tought = {
            title: req.body.title,
        }

        try{
            await Tought.update(tought, {where: { id : id }})
            req.flash('message', 'Pensamento atualizado com sucesso')

            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })
        }catch(err){
            console.log(err)
        }

    }

}

export default ToughtsController