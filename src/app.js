const path=require('path')
const express=require('express')
const hbs=require('hbs')
const request = require('request')
const geocode=require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port=process.env.PORT || 3000


//define paths for express config
const publicpath = path.join(__dirname, '../public')
const viewpath =path.join(__dirname,'../templates/views')
const partialpaths = path.join(__dirname,'../templates/partials')
console.log(partialpaths)


//setup handlers engine and viwes location
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpaths)

//setup static directory
app.use(express.static(publicpath))

app.get('/help/*', (req, res) => {
    res.render('404',
        {
            para: 'help article not found',
            name: 'Poonam kumari',
            title: 404 })
})


app.get('',(req,res)=>{
    res.render('index',{
    title:'WEATHER APP',
    name:'Poonam kumari'})
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query)
res.send({products:[]
})
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'ABOUT ME',
        name:'Poonam kumari'
    })
})
app.get('/help',(req,res)=>{
        res.render('help',{
          msg:'Pls help me',
          title:'HELP',
          name:'Poonam kumari'
         })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide the search term'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location = {}}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
              forecast:forecastdata,
            location,
            address:req.query.address
        })
    })
 })
})
    

app.get('*', (req, res) => {
    res.render('404',{para:'my 404 page',
    name:'Poonam kumari',
    title:404
})})

app.listen(port,()=>{
    console.log('server is up on port'+port)
}) 
