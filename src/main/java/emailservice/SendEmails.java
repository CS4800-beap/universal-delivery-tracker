package emailservice;

import accounts.AccountManager;

import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.List;

public class SendEmails implements Runnable {

    @Override
    public void run() {
        System.out.println("sending emails");
        List<String> emails = getEmailList();
        for(String email: emails) {
            List<String> trackingData = getTrackingDetails(email);
            String message = "";
            for(String s: trackingData){
                String[] parts = s.split(";");
                message += "You are currently tracking package " + parts[0] + " mailed with " + parts[2] + ".\n";
            }
            sendMail(email, message);
        }
    }

    public void sendMail(String to, String msg){
        try {
            Message message = new MimeMessage(EmailClientConfig.getSession());
            message.setFrom(new InternetAddress("Universal Delivery Tracker"));
            message.setRecipients(
                    Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject("Your Delivery Updates");

            MimeBodyPart mimeBodyPart = new MimeBodyPart();
            mimeBodyPart.setContent(msg, "text/html; charset=utf-8");

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(mimeBodyPart);

            message.setContent(multipart);

            System.out.println("here");
            Transport.send(message);
        }catch(Exception e){
            e.printStackTrace();
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
