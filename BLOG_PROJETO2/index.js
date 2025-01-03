import exphbs from 'express-handlebars'
import express from 'express'

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
    const produtos = [{
        nome: 'Kindle',
        preco: 100,
        descricao: 'Leitor de livros digitais',
        imagem:'https://m.media-amazon.com/images/I/71PMhxKPb1L._AC_UF1000,1000_QL80_.jpg'
    },{
        nome: 'Tablet',
        preco: 200,
        descricao:'Tablet para acessar a internet',
        imagem:'https://imgs.casasbahia.com.br/1565697320/1xg.jpg'
    },{
        nome: 'TV',
        preco: 300,
        descricao: 'Televisão para assistir filmes e séries',
        imagem:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaT_rvRRYCDRDHHk0I9MQWPmGrai7BJes9pA&s'
    },{
        nome: 'Geladeira',
        preco: 400,
        descricao: 'Geladeira para armazenar alimentos',
        imagem:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB9-J-zJT1JFXlSHgCKdTRYnxJWLXQgimmsw&s'
    }]
    res.render('home',{produtos})
})

app.get('/produto/:nome', (req, res) => {
    const nome = req.params.nome
    const produtos = [{
        nome: 'Kindle',
        preco: 100,
        descricao: 'Leitor de livros digitais',
        imagem:'https://m.media-amazon.com/images/I/71PMhxKPb1L._AC_UF1000,1000_QL80_.jpg'
    },{
        nome: 'Tablet',
        preco: 200,
        descricao:'Tablet para acessar a internet',
        imagem:'https://imgs.casasbahia.com.br/1565697320/1xg.jpg'
    },{
        nome: 'TV',
        preco: 300,
        descricao: 'Televisão para assistir filmes e séries',
        imagem:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaT_rvRRYCDRDHHk0I9MQWPmGrai7BJes9pA&s'
    },{
        nome: 'Geladeira',
        preco: 400,
        descricao: 'Geladeira para armazenar alimentos',
        imagem:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB9-J-zJT1JFXlSHgCKdTRYnxJWLXQgimmsw&s'
    }]
    const produto = produtos.find(p => p.nome.toLowerCase() === nome.toLowerCase())
    if (produto) {
        res.render('produto', {produto})
    } else {
        res.status(404).send('Produto não encontrado')
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})