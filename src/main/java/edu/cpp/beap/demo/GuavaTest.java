package edu.cpp.beap.demo;

import com.google.common.base.Strings;


public class GuavaTest {
    
    public static String createStrings(String string, String repeat) {
        int x;
        try {
            x = Integer.parseInt(repeat);
        } catch (Exception e) {
            x = 3; // Default value
        }
        return Strings.repeat(string, x);
    }

}
