package TrackingAPIs;

import java.net.HttpURLConnection;

public class DHLTracker implements TrackingApiInterface {

    HttpURLConnection httpConnection;

    public DHLTracker(){

    }

    @Override
    public String getTrackingData(String trackingNumber){
        return "";
    }
}
