package edu.cpp.beap.universaldeliverytracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class TrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrackerApplication.class, args);

		AccountManager am = AccountManager.getAccountManager();
		am.createNewAccount("aroo.sh", "arush@email.com", "passwerd", "arush", "kakkar");
		am.login("aruh@email.com", "password");
	}
}
