package emailservice;

import accounts.AccountManager;
import emailservice.SendEmails;

import java.util.List;

public class EmailUpdates implements Runnable {
    @Override
    public void run() {
        List<String> emails = getEmailList();
        for(String email: emails) {
            List<String> trackingData = getTrackingDetails(email);
            String message = "";
            for(String s: trackingData){
                String[] parts = s.split(";");
                message += "You are currently tracking package " + parts[0] + " mailed with " + parts[2] + ".\n";
            }
            SendEmails.sendTextMail(email, message, "Your Delivery Updates");
        }
    }

    private List<String> getEmailList(){
        AccountManager am = AccountManager.getAccountManager();
        List<String> emails = am.getEmails();
        return emails;
    }

    private List<String> getTrackingDetails(String email){
        AccountManager am = AccountManager.getAccountManager();
        List<String> trackingDetails = am.getTrackingDetailsFromEmail(email);
        return trackingDetails;
    }
}
