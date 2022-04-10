package edu.cpp.beap.universaldeliverytracker;

import accounts.AccountManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrackerApplication.class, args);

		AccountManager am = AccountManager.getAccountManager();
	}
}
