package edu.cpp.beap.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@GetMapping("/greet")
	public String greet(@RequestParam(value = "name", defaultValue = "User") String name) {
	return String.format("Greetings %s!", name);
	}
	
	
	@GetMapping("/login")
	public String login() {
	return String.format("This will be our login page");
	}

}
