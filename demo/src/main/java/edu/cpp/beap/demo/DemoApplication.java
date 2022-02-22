package edu.cpp.beap.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello() {
	return "Hello BEAP";
	}
	
	
//	@GetMapping("/hello")
//	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
//	return String.format("Hello %s!", name);
//	}

}
