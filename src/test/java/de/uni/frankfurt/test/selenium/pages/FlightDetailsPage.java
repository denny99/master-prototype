package de.uni.frankfurt.test.selenium.pages;

import de.uni.frankfurt.test.selenium.helper.ActionsOnPage;
import org.openqa.selenium.WebDriver;

public class FlightDetailsPage extends Page {
    public static final String VIEW_FLIGHT_BUTTON = "datatableForm:flightsTable:%s:viewFlight";
    public static final String FLIGHT_DETAILS_CONTAINER = "viewFlight:flightDetailsContainer";
    public static final String BACK_BUTTON = "viewFlight:pageNav:backButton";

    public FlightDetailsPage(
            WebDriver driver,
            ActionsOnPage action) {
        super(driver, action);
    }

    /**
     * go back to flights overview
     */
    public void back() {
        this.action.clickElement(BACK_BUTTON);
    }

    @Override
    public void getPage() {
        this.getPage(0);
    }

    /**
     * @param index row id in datatable
     */
    public void getPage(int index) {
        this.action.clickElement(String.format(VIEW_FLIGHT_BUTTON, index));
    }
}
