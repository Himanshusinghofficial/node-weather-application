const request =require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&units=metric&appid=cbd08c3c9e3b8280fff988c087f0b43e'

    request({url:url,json:true},(error,response)=>{
        if(error){
        callback('unable to connect to weather service!',undefined)
        }else if(response.body.main.error){
        callback('unable to find the location',undefined)
        }
        else{
            var date=new Date((response.body.dt*1000)+19800)
                 var dateval=date.toLocaleString();
            var sunrise=new Date((response.body.sys.sunrise*1000)+19800)
            sunriseval=sunrise.toLocaleTimeString();
            var sunset=new Date((response.body.sys.sunset*1000)+19800)
            sunsetval=sunset.toLocaleTimeString();
             
        //  callback(undefined, 'Weather condition '+response.body.weather[0].main + ' It is currently ' + (response.body.main.temp) +' deg C' +'                                                                                       Date:'+  date + '                                                                                                               sunrise:' + sunrise +'                                                                                                                 sunset:'+sunset)
         callback(undefined,{
             condition:response.body.weather[0].main,
             temp:response.body.main.temp,
             date:dateval,
             sunrise:sunriseval,
             sunset:sunsetval

         })
        }
    })
}

module.exports=forecast