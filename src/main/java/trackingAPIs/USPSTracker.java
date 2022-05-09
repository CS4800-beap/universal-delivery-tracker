package trackingAPIs;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class USPSTracker implements TrackingApiInterface {
    @Override
    public String getTrackingData(String trackingNumber) throws IOException {
        Document doc = Jsoup.connect("https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=" + trackingNumber + "%2C&tABt=true")
                .userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7")
                .get();
        //System.out.println(doc.body().toString());
        Elements temp = doc.getAllElements();
        System.out.println(doc.toString());

        Elements events = doc.getElementsByClass("tracked-numbers");
        System.out.println(events.toString());
        return "todo";
    }

}
