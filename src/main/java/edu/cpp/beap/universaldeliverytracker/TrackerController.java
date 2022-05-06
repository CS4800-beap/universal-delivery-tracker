package edu.cpp.beap.universaldeliverytracker;

import exceptions.AccountExceptions.InvalidIDException;
import exceptions.TokenExceptions.TokenExpiredException;

import org.checkerframework.checker.units.qual.A;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import accounts.AccountManager;
import trackingAPIs.DHLTracker;
import trackingAPIs.FedExTracker;
import trackingAPIs.TrackingApiInterface;
import trackingAPIs.USPSTracker;

@CrossOrigin
@RestController
public class TrackerController implements ErrorController {

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public ModelAndView saveLeadQuery() {
        return new ModelAndView("forward:/");
    }

    public String getErrorPath() {
        return PATH;
    }

    @GetMapping("/login")
    public String login(@RequestParam(value = "emailid") String emailid,
                        @RequestParam(value = "password") String password){
        AccountManager accountManager = AccountManager.getAccountManager();
        try {
            return accountManager.login(emailid, password); // Login successful, return token
        }
        catch(Exception e){
            return e.getMessage();
        }
    }

    @GetMapping("/signup")
    public String signup(@RequestParam(value = "emailid") String emailid,
                         @RequestParam(value = "password") String password,
                         @RequestParam(value = "fname") String fname,
                         @RequestParam(value = "lname") String lname){
        AccountManager accountManager = AccountManager.getAccountManager();

        try{
            accountManager.createNewAccount(emailid, emailid, password, fname, lname);
            return "true";
        }catch(DuplicateKeyException e){
            System.out.println(e.getMessage());
            return "false";
        }
    }

    @GetMapping("/addTrackingNumber")
    public String addTrackingNumber(@RequestParam(value = "token") String token,
                                    @RequestParam(value = "trackingNumber") String trackingNumber,
                                    @RequestParam(value = "nickname") String nickname,
                                    @RequestParam(value = "courier") String courier){
        AccountManager accountManager = AccountManager.getAccountManager();
        try{
            if(accountManager.addTrackingNumber(token, trackingNumber, nickname, courier))
                return "success";
        }catch(TokenExpiredException e){
            e.printStackTrace();
        }catch(InvalidIDException e){
            e.printStackTrace();
        }

        return "failure";
    }

    @GetMapping("/getTrackingNumbers")
    public List<String> getTrackingNumbers(@RequestParam(value = "token") String token){
        AccountManager accountManager = AccountManager.getAccountManager();
        try {
            return accountManager.getTrackingNumbers(token);
        }catch(TokenExpiredException e){
            e.printStackTrace();
        }catch(InvalidIDException e){
            e.printStackTrace();
        }

        return Collections.emptyList();
    }

    @GetMapping("/validateToken")
    public boolean validateToken(@RequestParam(value = "token") String token) throws TokenExpiredException{
        if (token.length() < 1)
            return false;
        AccountManager accountManager = AccountManager.getAccountManager();
        return accountManager.validateToken(token);        
    }

    @GetMapping("/track")
    public String track(@RequestParam(value = "tn") String tn,
                        @RequestParam(value = "courier") String courier){
        TrackingApiInterface tracker;
        try {
            switch (courier) {
                case "FedEx":
                    tracker = new FedExTracker();
                    return tracker.getTrackingData(tn);
                case "DHL":
                    tracker = new DHLTracker();
                    return tracker.getTrackingData(tn);
                case "USPS":
                    tracker = new USPSTracker();
                    return tracker.getTrackingData(tn);
                case "UPS":
                    return "todo";
                default:
                    break;
            }
        }catch(IOException e){
            return "failed to track";
        }
        return "failed to track";
    }
}
