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
        accountManager.createNewAccount("randUser" + System.currentTimeMillis(), emailid, password, "fakefirstname", "fakelastname");
        return "";
    }
}
