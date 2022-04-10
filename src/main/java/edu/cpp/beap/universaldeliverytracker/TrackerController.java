package edu.cpp.beap.universaldeliverytracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import accounts.AccountManager;

@RestController
public class TrackerController {

    @GetMapping("/login")
    public String login(@RequestParam(value = "emailid") String emailid, @RequestParam(value = "password") String password){
        AccountManager accountManager = AccountManager.getAccountManager();
        try {
            accountManager.login(emailid, password);
        }
        catch(Exception e){
            return e.getMessage();
        }
        return "true";  // Login was successful
    }

    @GetMapping("/signup")
    public String signup(@RequestParam(value = "emailid") String emailid, @RequestParam(value = "password") String password, @RequestParam(value = "fname") String fname, @RequestParam(value = "lname") String lname){
        

        
        // Temporary return to test API call
        return "Email: " + emailid + ", Password: " + password + ", First Name: " + fname + ", Last Name: " + lname;
        
        // return "true"; // Signup was successful
    }
}
