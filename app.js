const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
require('./models/Sale')
const Sale = mongoose.model('sales')

// CONFIG body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CONFIG mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/wydDB').then(() => {
    console.log('Conectando ao BD..')
}).catch((err)=>{
    console.log('Falha ao conectar ao BD..')
})

// CONFIG static files
app.use(express.static(__dirname + '/views/public'))

// CONFIG handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//  GET ROUTES 
app.get('/', (req, res) => {
    Sale.find().sort('dateIn: ascending').then((sales) => {
        res.render('public/index', { sales: sales })
    }).catch((err) => {
        console.log('falha ao listar')
    })
})

// POST ROUTES
app.post('/add/sale', (req, res) => {

    newSale = new Sale({
        client: req.body.client,
        payment: req.body.payment,
        cash: req.body.cash,
        gold: req.body.gold,
        dateAt: req.body.dateAt
    })
    newSale.save().then(() => {
        console.log('Venda registrada' + newSale)
        res.redirect('/')
    })
})

// CONFIG port
app.listen(3000)