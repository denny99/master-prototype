package de.uni.frankfurt.helper;

import java.io.*;
import java.util.Properties;

public class PropertiesHelper {
    private static final String PROPERTIES_PATH = "target/test-classes/server.properties";
    private static Properties properties;

    static {
        properties = new Properties();
        InputStream theInputStream = null;
        File theFile = new File(PROPERTIES_PATH);
        if (theFile.exists()) {
            System.out.println(
                    "server.properties existiert mit dem angegebenen Pfad. Pfad: " +
                            theFile.getAbsolutePath());
        } else {
            System.out.println(
                    "server.properties existiert nicht mit dem angegebenen Pfad.");
        }
        try {
            theInputStream = new FileInputStream(theFile);
        } catch (FileNotFoundException e1) {
            throw new RuntimeException(
                    "Properties-Datei server.properties kann nicht geladen werden.", e1);
        }
        try {
            properties.load(theInputStream);
        } catch (IOException e) {
            throw new RuntimeException(
                    "Properties-Datei server.properties kann nicht geladen werden.", e);
        }
    }

    public static String getProperty(String propertyKey) {
        return properties.getProperty(propertyKey);
    }
}
