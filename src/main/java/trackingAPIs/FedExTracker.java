package trackingAPIs;

import com.squareup.okhttp.*;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class FedExTracker implements TrackingApiInterface{

    private final String baseURL = "https://apis.fedex.com/track/v1/trackingdocuments?";

    @Override
    public String getTrackingData(String trackingNumber) throws IOException {
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");

        String OAuthToken = getBearerToken();

        RequestBody body = RequestBody.create(mediaType, "{\n" +
                "  \"trackingInfo\": [\n" +
                "    {\n" +
                "      \"trackingNumberInfo\": {\n" +
                "        \"trackingNumber\": \"" + trackingNumber + "\"\n" +
                "      }\n" +
                "    }\n" +
                "  ],\n" +
                "  \"includeDetailedScans\": true\n" +
                "}");

        Request request = new Request.Builder()
                .url("https://apis.fedex.com/track/v1/trackingnumbers")
                .post(body)
                .addHeader("Content-Type", "application/json")
                .addHeader("X-locale", "en_US")
                .addHeader("Authorization", "Bearer " + OAuthToken)
                .build();

        Response response = client.newCall(request).execute();

        return getJSON(new InputStreamReader(response.body().byteStream()));
    }

    private String getBearerToken() throws IOException{
        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
        RequestBody body = RequestBody.create(mediaType, "grant_type=client_credentials&client_id=l7be9ec65ba9da4683b6803a58b6c75c14&client_secret=13722b1d2ca94d14b63944c7cb7e29be");
        Request request = new Request.Builder()
                .url("https://apis.fedex.com/oauth/token")
                .post(body)
                .addHeader("Content-Type", "application/json")
                .build();

        Response response = client.newCall(request).execute();

        return getOAuthKey(getJSON(new InputStreamReader(response.body().byteStream())));
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

    private static String getOAuthKey(String json){
        JSONObject jsonObject = new JSONObject(json);
        return jsonObject.getString("access_token");
    }
}
