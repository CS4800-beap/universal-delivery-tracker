package trackingAPIs;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class USPSTracker implements TrackingApiInterface {
    @Override
    public String getTrackingData(String trackingNumber) throws IOException {
        Document doc = Jsoup.connect("https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=" + trackingNumber + "%2C&tABt=true").get();
        //System.out.println(doc.body().toString());
        Elements temp = doc.getAllElements();

        Elements events = doc.getElementsByClass("tracked-numbers");
        System.out.println(events.toString());
        return null;
    }

}
