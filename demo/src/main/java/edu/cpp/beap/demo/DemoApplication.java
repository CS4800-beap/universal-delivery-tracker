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
	
	@GetMapping("/login")
	public String login() {
	return String.format("This will be our login page");
	}

	@GetMapping("/signup")
	public String signUp() {
	return String.format("This will be our signup page");
	}

	@GetMapping("/guava_test")
	public String greet(@RequestParam(value = "text", defaultValue = "text ") String text, @RequestParam(value = "repeat", defaultValue = "3") String repeat) {
		return GuavaTest.createStrings(text, repeat);
	}
}
