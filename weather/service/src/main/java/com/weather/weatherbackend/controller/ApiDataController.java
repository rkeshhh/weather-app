package com.weather.weatherbackend.controller;

import com.weather.weatherbackend.domain.cityDataSchema.City;
import com.weather.weatherbackend.domain.dailyDataSchema.Daily;
import com.weather.weatherbackend.service.ApiDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/api-data")
public class ApiDataController {
    private final ApiDataService apiDataService;
    @Autowired
    public  ApiDataController(ApiDataService apiDataService) {
        this.apiDataService = apiDataService;
    }

    @GetMapping(value={"", "/today/city"})
    public ResponseEntity<?> getTodayDataFromCity(@RequestParam(value = "q") String q) {
        try{
            City todayWeather = apiDataService.consumeCityApi("https://api.openweathermap.org/data/2.5/weather?q="+q+"&unit=matric&appid=f896b0fcb80ccea35259af44e58dd80a");
            return ResponseEntity.status(HttpStatus.OK).body(todayWeather);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.OK).body("Not Found");
        }
    }
    @GetMapping(value={"", "/today/lonlat"})
    public ResponseEntity<?> getTodayDataFromLonLat(@RequestParam String lon, @RequestParam String lat){
        try{
            City todayWeather = apiDataService.consumeCityApi("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&unit=matric&appid=f896b0fcb80ccea35259af44e58dd80a");
            return ResponseEntity.status(HttpStatus.OK).body(todayWeather);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.OK).body("Not Found");
        }
    }
    @GetMapping(value={"", "/daily/lonlat"})
    public ResponseEntity<?> getDailyDataFromLonLat(@RequestParam String lon, @RequestParam String lat){
        try{
            Daily dailyData = apiDataService.consumeDailyDataApi("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&&exclude=minutely,hourly&unit=matrix&appid=f896b0fcb80ccea35259af44e58dd80a");
            return ResponseEntity.status(HttpStatus.OK).body(dailyData);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.OK).body("");

        }
    }
}
