package emailservice;

import accounts.AccountManager;
import emailservice.SendEmails;
import trackingAPIs.DHLTracker;
import trackingAPIs.FedExTracker;
import trackingAPIs.USPSTracker;

import java.io.IOException;
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
                message += "Package \"" + parts[1] + "\" (" + parts[0] + ") mailed with " + parts[2] + ": " + getMostRecentTrackingUpdate(parts[0], parts[2]) + ".\n";
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

    private String getMostRecentTrackingUpdate(String tn, String courier){
        try {
            switch (courier) {
                case "FedEx":
                    FedExTracker fet = new FedExTracker();
                    return fet.getMostRecentUpdateFromJson(fet.getTrackingData(tn));
                case "DHL":
                    DHLTracker dt = new DHLTracker();
                    return dt.getMostRecentUpdateFromJson(dt.getTrackingData(tn));
                case "USPS":
                    return "todo";
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
