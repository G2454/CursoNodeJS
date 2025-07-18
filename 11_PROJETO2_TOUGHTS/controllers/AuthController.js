import User from '../models/User.js'
import bcrypt from 'bcryptjs'

const user = User


class AuthController {

    static login(req, res){
        res.render('auth/login')
    }

    static register(req, res){
        res.render('auth/register')
    }

    static async loginPost(req, res){
        const {email, password} = req.body

        const user = await User.findOne({where: {email:email}})        

        if(!user){
            req.flash('message', 'Usuário não encontrado')
            res.render('auth/login')
            return
        }

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch){
            req.flash('message', 'Senha incorreta')
            res.render('auth/login')
            return
        }

        req.session.userId = user.id
        req.flash('message', 'Logado com sucesso')

        req.session.save(()=>{
            res.redirect('/')
        })

    }



    static async registerPost(req,res){
        const {name, email, password, confirmpassword} = req.body

        // validação da senha

        if(password != confirmpassword){
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')
            return
        }

        const checkIfUserExists = await User.findOne({where: {email :email}})

        if(checkIfUserExists){
            req.flash('message', 'O E-mail já está em uso!')
            res.render('auth/register')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user ={
            name,
            email,
            password: hashedPassword
        }

        try{
            const createdUser = await User.create(user)

            req.session.userId = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso')

            req.session.save(()=>{
            res.redirect('/')
            return
            })

        }catch(err){
            console.log(err)
        }

    }

        static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
        return
    }
}

export default AuthController