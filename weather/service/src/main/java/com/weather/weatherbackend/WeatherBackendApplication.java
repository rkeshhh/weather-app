package com.weather.weatherbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WeatherBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(WeatherBackendApplication.class, args);
		System.out.println("Server Started At: http://localhost:9000");
	}

}
