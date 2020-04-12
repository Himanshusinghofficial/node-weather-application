const request=require('request')
const forecast=require('./forecast')

const geocode=(address,callback)=>{
   
    const URL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGltYW5zaHVzaW5naDg4MTA0MiIsImEiOiJjazh1aDR0a24wNmM2M2ZwbGh4eXVoM251In0.Uom9t2T8b0imwkENFxxyjA'
       request({url:URL,json:true},(error,response)=>{
           if(error){
               callback('unable to connect to service!', undefined)
           }else if(response.body.features.length===0){
              callback('unable to find location try another search',undefined)
           }
           else{
               callback(undefined,{
                longitude:response.body.features[0].center[0],
                latitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
    
               })
           }
       })
    }
    // console.log(process.argv);
//    const address=process.argv[2]
//    console.log(address)

//     geocode(address,(error,data)=>{
//                 if(error){
//                     return console.log(error)
//                 }
//                 // console.log('Error',error)
//                 // console.log('Data',data)
    
//                 forecast(data.latitude,data.longitude,(error,forecastData)=>{
//                                 if(error){
//                                     return console.log(error)
//                                 }
//                                  console.log(data.location)
//                                  console.log(forecastData)
                        
//                                 // console.log('Error',error)
//                                 // console.log('Data',forecastData)
//                             })


//             })
            

    module.exports=geocode