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

import accounts.AccountManager;

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
    public String login(@RequestParam(value = "emailid") String emailid, @RequestParam(value = "password") String password){
        AccountManager accountManager = AccountManager.getAccountManager();
        try {
            return accountManager.login(emailid, password); // Login successful, return token
        }
        catch(Exception e){
            return e.getMessage();
        }
    }

    @GetMapping("/signup")
    public String signup(@RequestParam(value = "emailid") String emailid, @RequestParam(value = "password") String password, @RequestParam(value = "fname") String fname, @RequestParam(value = "lname") String lname){
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
    public String addTrackingNumber(@RequestParam(value = "token") String token, @RequestParam(value = "trackingNumber") String trackingNumber){
        AccountManager accountManager = AccountManager.getAccountManager();
        try{
            accountManager.addTrackingNumber(token, trackingNumber);
            return "success";
        }catch(TokenExpiredException e){
            e.printStackTrace();
        }catch(InvalidIDException e){
            e.printStackTrace();
        }

        return "failure";
    }

    @GetMapping("/getTrackingNumbers")
    public String getTrackingNumbers(@RequestParam(value = "token") String token){
        AccountManager accountManager = AccountManager.getAccountManager();
        try {
            return accountManager.getTrackingNumbers(token).toString();
        }catch(TokenExpiredException e){
            e.printStackTrace();
        }catch(InvalidIDException e){
            e.printStackTrace();
        }

        return "failure";
    }

    @GetMapping("/validateToken")
    public boolean validateToken(@RequestParam(value = "token") String token){
        
        // TODO: param token is received from the from user's localStorage or sessionStorage
        // validate token here to to determine if user is already logged in and should be redirected

        return false;

    }
}
