const request =require('request')
const forecast=(x,y,callback)=>{
    const url = 'https://api.darksky.net/forecast/a13caa9b32d978f195e3b1c5f4ff79d5/'+x+','+y+'?units=si'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to the service ',undefined)
        }
        else if (body.error){
            callback('problem in service',)
        }
        else{
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipIntensity} chance of rain. Humidity is ${body.daily.data[0].humidity} .`)
        }
    })
}



module.exports=forecast