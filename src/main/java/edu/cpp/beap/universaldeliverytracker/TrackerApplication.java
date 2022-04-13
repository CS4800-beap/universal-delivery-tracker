package edu.cpp.beap.universaldeliverytracker;

import accounts.AccountManager;
import io.jsonwebtoken.Jwt;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tokens.JwtTokenUtil;

@SpringBootApplication
public class TrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrackerApplication.class, args);
		//AccountManager am = AccountManager.getAccountManager();
	}
}
