package edu.cpp.beap.universaldeliverytracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import accounts.AccountManager;

@RestController
public class TrackerController {

    @GetMapping("/login")
    public String login(@RequestParam(value = "emailid") String emailid,@RequestParam(value = "password") String password){
        AccountManager accountManager = AccountManager.getAccountManager();
        try {
            accountManager.login(emailid, password);
        }
        catch(Exception e){
            return e.getMessage();
        }
        return "";
    }
}
