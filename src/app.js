const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./geocode')
const forecast=require('./forecast')


const app=express()
const port=process.env.PORT ||2356

app.set('view engine','hbs')

//if directory name is not views
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather App',
        name:'Himanshu singh'
    })
})

app.get('/about',(req,res)=>{
      res.render('about',{
          title:'About Me',
          name:'Himanshu singh'
      })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'ask help from Himanshu singh at hs882677@gmail.com'
    })
})
// app.get('',(req,res)=>{
//    res.send('Hello Express!')
// })

// app.get('/help',(req,res)=>{
//     res.send('<i><h2>Help page!<\h2><\i>')
// })

// app.get('/about',(req,res)=>{
//     res.send(`<h1>This is about page of this website</h1> `)
// })

app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
           error:'you must provide an address'
       })
   } 
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
      if(error){
          return res.send({error})
      }
      forecast(latitude,longitude,(error,forecastedata)=>{
          if(error){
              return res.send({error})
          }
          res.send({
            weather_condition: 'weather condition : ' +forecastedata.condition,
              location: 'Location : ' +location,
              address: 'Address : '+req.query.address,
            temperature: 'Temperature : ' +forecastedata.temp+' deg C',
            date: 'Date & Time : ' +forecastedata.date,
            sunrise_time: 'Sunrise Time : ' +forecastedata.sunrise,
            sunset_time: 'Sunset Time : ' +forecastedata.sunset
          })
      })

  })

//    res.send({
//        forecast:'it is snowing',
//        location:'INDIA',
//        address: req.query.address
//    })  
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

// 404 error page 
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Himanshu singh',
        errormsg:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Himanshu singh',
        errormsg:'page not found'
    })
})

app.listen(port,()=>{{
    console.log('server is start at '+ port)
}})