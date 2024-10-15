import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
  }
// TODO: Define a class for the Weather object
class Weather {
  tempF: number;
  windSpeed: number;
  humidity: number;
  city: string;
  date: string; 
  icon: string; 
  iconDescription: string;

  constructor(temp:number, wind:number, humidity:number, city:string, date:string, icon:string, iconDescription:string) {
    this.tempF = temp;
    this.windSpeed = wind;
    this.humidity = humidity;
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  private baseURL:string;
  private apiKey:string;
  private city:string;

  constructor(){
    this.baseURL = process.env.API_BASE_URL;
    this.apiKey = process.env.API_KEY;
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const res = await axios.get(`${this.baseURL}/${query}`);
    return res.data;
  }
  // TODO: Create destructureLocationData method
    private destructureLocationData(locationData: Coordinates): Coordinates {
      return {
        lat:locationData.lat,
        lon:locationData.lon,
      }
    }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `data/2.5/forecast?q=${this.city}&appid=${this.apiKey}`
  }
    // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData.city.coord);
  }
  // TODO: Create fetchWeatherData method
private async fetchWeatherData(coordinates: Coordinates) {
  const response = await axios.get(this.buildWeatherQuery(coordinates));
  return response.data
}
  // TODO: Build parseCurrentWeather method
private parseCurrentWeather(response: any) {
  const current = response.list[0];
  return new Weather(current.main.temp, current.wind.speed, current.main.humidity, this.city, current.dt_txt.split(' ')[0],current.weather[0].icon, current.weather[0].description);
}
  // TODO: Complete buildForecastArray method
private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
  let date = ''
    const fiveDayWeather = weatherData.filter(f=>{
   
    if (f.dt_txt.split(' ')[0] !== date) {
      date = f.dt_txt.split(' ')[0] 
      return true
    }
    date = f.dt_txt.split(' ')[0]
  })
  const fiveDayForecast = fiveDayWeather.map(f=>new Weather(f.main.temp, f.wind.speed, f.main.humidity,this.city, f.dt_txt.split(' ')[0],f.weather[0].icon, f.weather[0].description))
  console.log(fiveDayWeather);
  return [currentWeather, ...fiveDayForecast];
}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.city = city
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData)
    return this.buildForecastArray(currentWeather,weatherData.list)    
  }
}

export default new WeatherService();
