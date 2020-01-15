const request = require('request'),
      express = require('express'),
      app = express(), 
      dotenv = require('dotenv');
      
dotenv.config();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
    var city = req.query['city'];
    var country = req.query['country'];
    if (city!=undefined&&country!=undefined) {
        request("http://api.openweathermap.org/data/2.5/weather?q=" + city + ',' + country + "&units=imperial&APPID=" + process.env.APIID, function(err, respond, body){ 
            if (!err&&respond.statusCode==200) { 
                var weatherData = JSON.parse(body)
                res.render('home', {weatherData: weatherData});
            } else
            {
                res.render('home');
            }
        }) 
        } else {
            request("http://api.openweathermap.org/data/2.5/weather?q=" + 'los angeles' + ',' + 'US' + "&units=imperial&APPID=" + process.env.APIID, function(err, respond, body){
                if (!err&&respond.statusCode==200) {
                    var weatherData = JSON.parse(body)
                    res.render('home', {weatherData: weatherData});
                } else 
                {
                    res.render('home');
                }
            })
        }
});

app.listen(process.env.PORT, function(){
    console.log('weather app live on port ' + process.env.PORT);
});

