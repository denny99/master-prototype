package de.uni.frankfurt.test.selenium.helper;

import de.uni.frankfurt.helper.PropertiesHelper;
import de.uni.frankfurt.test.selenium.enums.SeleniumBrowser;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.safari.SafariDriver;

/**
 * Hilfsklasse für das nacheinander Verwenden der verschiedenen Browser für
 * denselben Seleniumtest.
 *
 * @author MHU
 */
public class SetupSeleniumDriver {
    private static String baseUrl = null;
    private static String os = null;

    static {
        baseUrl = PropertiesHelper.getProperty("localhost.httpport");
        if (baseUrl == null) {
            throw new RuntimeException(
                    "server.properties enthält keinen URL-Eintrag.");
        }
        System.out.println("baseUrl: " + baseUrl);
        os = PropertiesHelper.getProperty("system");
        if (os == null) {
            throw new RuntimeException(
                    "server.properties enthält keinen system-Eintrag.");
        }
        System.out.println("os: " + os);
    }

    public static String getBaseUrl() {
        return baseUrl;
    }

    /**
     * Diese Method kann von der "@Before"-Methode aufgerufen werden, um das für
     * den übergebenen Browser zugehörigen Treiber zu ermitteln und
     * zurückzuliefern.
     *
     * @param currentSeleniumBrowser
     * @return
     */
    public static WebDriver getCurrentBrowserDriver(
            final SeleniumBrowser currentSeleniumBrowser) {
        WebDriver resultDriver = null;
        if (SeleniumBrowser.FIREFOX.equals(currentSeleniumBrowser)) {
            DesiredCapabilities browser = DesiredCapabilities.firefox();
            browser.setJavascriptEnabled(true);
            resultDriver = new FirefoxDriver(browser);
        } else if (SeleniumBrowser.INTERNET_EXPLORER.equals(
                currentSeleniumBrowser)) {
            String ieDriver = PropertiesHelper.getProperty("driver.ie");
            System.setProperty("webdriver.ie.driver", ieDriver);// Pfad
            // spezifizieren
            resultDriver = new InternetExplorerDriver();
        } else if (SeleniumBrowser.CHROME.equals(currentSeleniumBrowser)) {
            String chromeDriver = PropertiesHelper.getProperty("driver.chrome");
            System.setProperty("webdriver.chrome.driver", chromeDriver);// Pfad
            // spezifizieren
            resultDriver = new ChromeDriver();
        } else if (SeleniumBrowser.SAFARI.equals(currentSeleniumBrowser)) {
            DesiredCapabilities browser = DesiredCapabilities.safari();
            browser.setJavascriptEnabled(true);
            resultDriver = new SafariDriver(browser);
        } else if (SeleniumBrowser.HTML_UNIT.equals(currentSeleniumBrowser)) {
            resultDriver = new HtmlUnitDriver(true);
        }
        return resultDriver;
    }
}
