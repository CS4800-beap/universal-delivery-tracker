package emailservice;

import javax.mail.*;
import java.util.Properties;

public class EmailClientConfig {

    private static Session session;

    public static void establishConnection(){
        Properties props = new Properties();
        props.put("mail.smtp.auth", true);
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("kakkarcpp@gmail.com", "hsOOraCPP7497427");
            }
        });
    }

    public static Session getSession(){
        establishConnection();
        return session;
    }
}
