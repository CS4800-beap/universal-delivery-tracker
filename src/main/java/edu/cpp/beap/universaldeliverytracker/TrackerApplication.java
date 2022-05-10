package edu.cpp.beap.universaldeliverytracker;

import accounts.AccountManager;
import emailservice.EmailUpdates;
import emailservice.SendEmails;
import org.checkerframework.checker.units.qual.A;
import scheduling.ThreadPoolTaskSchedulerConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class TrackerApplication {

	public static void main(String[] args) {
//		SpringApplication.run(TrackerApplication.class, args);
//
//		try {
//			ThreadPoolTaskScheduler scheduler = ThreadPoolTaskSchedulerConfig.threadPoolTaskScheduler();
//			scheduler.schedule(new EmailUpdates(), new CronTrigger("0 30 8 1,5,9,13,17,21,25,28 * *"));
//		}catch(Exception e){
//			e.printStackTrace();
//		}

		SendEmails.sendTextMail("arushsthrowaway@gmail.com", "test", "sub");
		AccountManager am = AccountManager.getAccountManager();
		am.createNewAccount("arushsthrowaway@gmail.com", "arushsthrowaway@gmail.com", "password", "arush", "kakkar");
	}
}
