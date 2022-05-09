package edu.cpp.beap.universaldeliverytracker;

import emailservice.SendEmails;
import emailservice.ThreadPoolTaskSchedulerConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class TrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrackerApplication.class, args);

		try {
			ThreadPoolTaskScheduler scheduler = ThreadPoolTaskSchedulerConfig.threadPoolTaskScheduler();
			scheduler.schedule(new SendEmails(), new CronTrigger("0 30 8 1,5,9,13,17,21,25,28 * *"));
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
