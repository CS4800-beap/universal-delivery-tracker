package edu.cpp.beap.universaldeliverytracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class CurrentTimeController {
    @GetMapping("/api/currenttime")
    public String currentTime() {
        return "The current time is " + new Date() + "\n";
    }
}
