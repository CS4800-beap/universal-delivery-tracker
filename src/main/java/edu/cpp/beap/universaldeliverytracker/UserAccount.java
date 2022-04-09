package edu.cpp.beap.universaldeliverytracker;

import java.util.List;

public class UserAccount {

    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    public UserAccount(){

    }

    public UserAccount(String uname, String mail, String pwd, String fName, String lName){
        username = uname;
        email = mail;
        password = pwd;
        firstName = fName;
        lastName = lName;
    }

    public List<String> getTrackingNumbers(){
        return null;
    }

    public boolean addTrackingNumber(String trackingNum){
        return false;
    }

    public boolean checkPassword(String pwd){
        return password.equals(pwd);
    }
}
