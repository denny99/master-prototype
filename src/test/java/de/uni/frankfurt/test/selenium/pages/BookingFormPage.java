package de.uni.frankfurt.test.selenium.pages;

import de.uni.frankfurt.test.selenium.helper.ActionsOnPage;
import org.openqa.selenium.WebDriver;

public class BookingFormPage extends Page {
    public static final String BOOK_FLIGHT_BUTTON = "datatableForm:flightsTable:%s:bookFlight";
    public static final String CANCEL_BOOKING_BUTTON = "bookingData:cancelBookingButton";
    public static final String PASSENGER_COUNT_OUTPUT = "bookingData:passengerCountOutput";
    public static final String PASSENGER_TOOLTIP_BUBBLE = "bookingData:passengerTooltipBubble";
    public static final String PASSENGER_TOOLTIP = "bookingData:passengerTooltip";
    public static final String COST_ERROR_MESSAGE = "bookingData:costMsg";
    public static final String INVALID_INPUT = "Enter only Numbers";

    public BookingFormPage(
            WebDriver driver,
            ActionsOnPage action) {
        super(driver, action);
    }

    /**
     * @param passengerAmount input for text field
     */
    public void setPassengerAmount(String passengerAmount) {
        this.action.sendKeyInElement(PASSENGER_COUNT_OUTPUT, passengerAmount);
        try {
            PassengerFormPage.maxPassengers = Integer.parseInt(passengerAmount);
        } catch (NumberFormatException e) {
            PassengerFormPage.maxPassengers = 0;
        }
    }

    /**
     * go back to flights overview
     */
    public void cancel() {
        this.action.clickElement(CANCEL_BOOKING_BUTTON);
    }

    @Override
    public void getPage() {
        this.getPage(0);
    }

    /**
     * @param index row id in datatable
     */
    public void getPage(int index) {
        this.action.clickElement(String.format(BOOK_FLIGHT_BUTTON, index));
    }

    /**
     * hover over bubble for tooltip
     */
    public void showToolTip() {
        this.action.clickElement(PASSENGER_TOOLTIP_BUBBLE);
    }
}
