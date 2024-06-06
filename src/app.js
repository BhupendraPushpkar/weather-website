const path = require('path')
const express = require('express')
const { title } = require('process')
const hbs = require('hbs')
const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')

const app = express()

const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('',(req,res) => {
    res.render('index',{
        title: 'weather App',
        name : 'bhanu'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name : 'Bhupendra'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'This is a help page where we should help you but we won\'t lol ',
        title :'Help',
        name : 'Bhupii'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error : 'Please provide a address in url ex(?address = indore)'
        })
    }
    geocode(req.query.address, (error,{latitude, longitude} = {}) => {
        if(error)
        {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecatsData) => {
        if(error)
        {
            return res.send({
                error
            })
        }
        res.send({
            latitude,
            longitude,
            message : forecatsData,
            location : req.query.address
        })
        })
    })
    // res.send({
    //     forecast : 'It is hella hot',
    //     location : 'Indore',
    //     address : req.query.address
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error : 'You must provide a search term'
        })   
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title :'404',
        name : 'Bhupendra',
        message : "Help article not Found."
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title :'404',
        name : 'Bhupendra',
        message : "Page not found."
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})
// not needed as index.html is a special name and node recognizae it as first page
// app.get('', (req, res) => {
//     res.send('<h1>hello express</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name :'bhanu',
//         age : 25
//     },
//     {
//         name : 'abhi',
//         age : 25
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<title>About Page</title><h2>Nothing to show</h2>')
// })

