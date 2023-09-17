import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit{

  city: string = '';
  WeatherData:any;
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.WeatherData={
      main:{},
      isDay:true 
    }
    this.getWeatherData();
    console.log(this.WeatherData);
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=4824edb39977031a7c6d707aecb30f77')
    .then(Response=>Response.json())
    .then(data=>{this.setWeatherData(data);})
    // let data=JSON.parse('{"coord":{"lon":10.99,"lat":44.34},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"base":"stations","main":{"temp":298.48,"feels_like":298.74,"temp_min":297.56,"temp_max":300.05,"pressure":1015,"humidity":64,"sea_level":1015,"grnd_level":933},"visibility":10000,"wind":{"speed":0.62,"deg":349,"gust":1.18},"rain":{"1h":3.16},"clouds":{"all":100},"dt":1661870592,"sys":{"type":2,"id":2075663,"country":"IT","sunrise":1661834187,"sunset":1661882248},"timezone":7200,"id":3163858,"name":"Varanasi","cod":200}')
    // this.setWeatherData(data);
  }

  setWeatherData(data: any){
    this.WeatherData=data;
    let sunseTime=new Date(this.WeatherData.sys.sunset*1000);
    this.WeatherData.sunse_time=sunseTime.toLocaleDateString();
    let currentDate= new Date();
    this.WeatherData.isDay=
    (currentDate.getTime()<sunseTime.getTime());
    this.WeatherData.temp_celcius=(this.WeatherData.main.temp-273.15).toFixed(0);
    this.WeatherData.temp_min=(this.WeatherData.main.temp_min-273.15).toFixed(0);
    this.WeatherData.temp_max=(this.WeatherData.main.temp_max-273.15).toFixed(0);
    this.WeatherData.temp_feels_like=(this.WeatherData.main.temp_feels_like-273.15).toFixed(0);
  }

  searchCity(): void {
    if (this.city.trim() === '') {
      // Check if the city input is empty
      return;
    }
    const apiKey = '4824edb39977031a7c6d707aecb30f77';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setWeatherData(data);
        console.log(this.WeatherData);
      })
      .catch(error => {
        console.log('An error occurred while fetching weather data:', error);
      });
  }
  
}
