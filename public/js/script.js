 
// console.log('Client site jaavascript is loaded!')


const weatherForm=document.querySelector('form')
const seaechElement=document.querySelector('input')
const messageOne=document.querySelector('#message_1')
const messagetwo=document.querySelector('#message_2')
const messagethree=document.querySelector('#message_3')
const messagefour=document.querySelector('#message_4')
const messagefive=document.querySelector('#message_5')
const messagesix=document.querySelector('#message_6')
// const messageseven=document.querySelector('#message_7')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=seaechElement.value
    // console.log(location)
    messageOne.textContent='Loading......'
    messagetwo.textContent=''
    messagethree.textContent=''
    messagefour.textContent=''
    messagefive.textContent=''
    messagesix.textContent=''
    // messageseven=textContent=''
   
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                // console.log(data.error)
                messageOne.textContent=data.error
            }else{ 
                // console.log(data.address)
                // console.log(data.Wheather_condition)
                // console.log(data.location)
                // console.log(data.temperature)
                // console.log(data.date)
                // console.log(data.sunrise_time)
                // console.log(data.sunset_time)
                messageOne.textContent=data.weather_condition 
                messagetwo.textContent=data.location
                messagethree.textContent=data.temperature
                messagefour.textContent=data.date
                messagefive.textContent=data.sunrise_time
                messagesix.textContent=data.sunset_time
                    
               
            }
        })
    })

})