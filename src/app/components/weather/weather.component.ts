import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  selectedCity: string = '';
  weatherData: any = null;
  dailyForecasts: any[] = [];  // Array to store 5-day forecasts
  cityList: string[] = ['London','Birmingham','Cardiff'];
  showLoader : boolean = false;

  constructor(private weatherService: WeatherService) {}

  onCityChange(event: any) {
    this.selectedCity = event.target.value;
    console.log(this.selectedCity);
    if (this.selectedCity) {
      this.showLoader = true;
      this.weatherService.getWeather(this.selectedCity).subscribe(data => {
        this.showLoader = false;
        this.weatherData = data;
        this.processDataToDisplay(data.list);
      });
    } else {
      this.weatherData = null;
      this.dailyForecasts = [];
    }
  }

  processDataToDisplay(forecasts: any[]) {
    this.dailyForecasts = forecasts.filter(forecast => forecast.dt_txt.includes("12:00:00"));
      //.slice(0, 5);
  }  
}


