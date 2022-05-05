package trackingAPIs;

import java.io.IOException;

public interface TrackingApiInterface {
    public String getTrackingData(String trackingNumber) throws IOException;
}
