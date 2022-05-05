package edu.cpp.beap.universaldeliverytracker;

import trackingAPIs.DHLTracker;
import trackingAPIs.FedExTracker;
import accounts.AccountManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class TrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrackerApplication.class, args);
		// try {
		// 	DHLTracker tracker = new DHLTracker();
		// 	System.out.println(tracker.getTrackingData("1410312503"));

		// 	FedExTracker tracker2 = new FedExTracker();
		// 	System.out.println(tracker2.getTrackingData("282797599820"));
		// }catch(IOException e){
		// 	e.printStackTrace();
		// }
	}
}
