package edu.cpp.beap.universaldeliverytracker;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class GsonTest {
    
    // Convert an array to JSON and return it as a string
    public static String createJsonString() {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        int[] values = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

        return gson.toJson(values).toString();
    }

}
