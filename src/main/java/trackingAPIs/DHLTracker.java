package trackingAPIs;

import http.ParameterStringBuilder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class DHLTracker implements TrackingApiInterface {

    private final String baseURL = "https://api-eu.dhl.com/track/shipments?";

    @Override
    public String getTrackingData(String trackingNumber) {
        try {
            Map<String, String> parameters = new HashMap<String, String>();
            parameters.put("trackingNumber", trackingNumber);
            parameters.put("service", "express");
            parameters.put("originCountryCode", "US");
            parameters.put("requesterCountryCode", "US");

            String parameterString = ParameterStringBuilder.getParamsString(parameters);

            URL url = new URL(baseURL + parameterString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("DHL-API-Key", "9nszyELKxlX5s3LiYj3REXpMtniWJk4M");

            String jsonResponse = getJSON(new InputStreamReader(connection.getInputStream()));

            connection.disconnect();

            return jsonResponse;
        }
        catch(IOException e){
            return "failed to get tracking data.";
        }

    }

    private static String getJSON(InputStreamReader response) throws IOException{
        BufferedReader in = new BufferedReader(response);
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();

        return content.toString();
    }
}
