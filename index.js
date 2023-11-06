import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";


const app = express();
const port = 3000 ;
const APIKey = "2a637689b9f5547704a4310298d0d666";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req,res) => {
res.render("index.ejs",{humidity :"",wind:"",temp:"", icon:"",city:""});
});

app.post("/search", async (req,res)=>{
    try {
      const city = req.body.cityName;
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
      const humidity = result.data.main.humidity;
      const speed = result.data.wind.speed;
      const temp = Math.round(result.data.main.temp);
      const icon = result.data.weather[0].icon;
      const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      res.render("index.ejs",{ humidity, wind : speed , temp , icon : weatherIcon, city} );
    } catch (error) {
        res.render("index.ejs", { humidity: "N/A", wind: "N/A" ,temp:"N/A"});
    }

});

app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`);
});
