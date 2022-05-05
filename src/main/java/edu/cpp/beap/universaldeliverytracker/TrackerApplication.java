package edu.cpp.beap.universaldeliverytracker;

import trackingAPIs.FedExTracker;
import accounts.AccountManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class TrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrackerApplication.class, args);
	}
}
