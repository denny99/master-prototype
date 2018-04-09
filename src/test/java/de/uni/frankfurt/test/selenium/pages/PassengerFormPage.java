package de.uni.frankfurt.test.selenium.pages;

import de.uni.frankfurt.test.selenium.helper.ActionsOnPage;
import org.openqa.selenium.WebDriver;

public class PassengerFormPage extends Page {
    public static final String FORCE_EDIT_BUTTON = "passengerData:forceEditButton";
    public static final String CONTINUE_BUTTON = "passengerData:continueButton";
    public static final String BOOKING_CONTINUE_BUTTON = "bookingData:continueButton";
    public static final String BACK_BUTTON = "passengerData:backButton";
    public static final String IDCARD_NUMBER_INPUT = "passengerData:idCardNumberInput";
    public static final String PASSPORT_NUMBER_INPUT = "passengerData:passportNumberInput";
    public static final String FIRSTNAME_INPUT = "passengerData:firstNameInput";
    public static final String LASTNAME_INPUT = "passengerData:lastNameInput";
    public static final String BIRTHDATE_INPUT = "passengerData:birthDateInput";
    public static final String LUGGAGE_RADIO = "passengerData:luggageRadio:%s";
    public static final String POPUP_ICON = "passengerData:helpIcon";
    public static final String PASSPORT_HELP_POPUP = "passengerData:passportHelpPopup";
    public static final String FIRSTNAME_ERROR_MESSAGE = "passengerData:firstNameErrorMessage";
    public static final String LASTNAME_ERROR_MESSAGE = "passengerData:lastNameErrorMessage";
    public static final String BIRTHDATE_ERROR_MESSAGE = "passengerData:birthDateErrorMessage";
    public static final String IDCARD_ERROR_MESSAGE = "passengerData:idCardErrorMessage";
    public static final String PASSPORT_ERROR_MESSAGE = "passengerData:passportErrorMessage";
    public static final String DUPLICATED_PASSENGER_TEXT = "This passenger is already registered";
    public static final String EMPTY_IDCARD_NUMBER_TEXT = "Insert your Id Card Number";
    public static final String EMPTY_PASSPORT_NUMBER_TEXT = "Insert your Passport Number";
    public static int maxPassengers = 0;
    private int currentPassenger = 0;

    public PassengerFormPage(
            WebDriver driver,
            ActionsOnPage action) {
        super(driver, action);
    }

    /**
     * go back to last passenger
     */
    public void back() {
        this.action.clickElement(BACK_BUTTON);
        if (currentPassenger != 0) {
            this.currentPassenger--;
        }
    }

    /**
     * @param idCardNumber   string
     * @param passportNumber string
     * @param firstName      string
     * @param lastName       string
     * @param birthDate      string with format dd.MM.yyyy
     * @param luggage        number of luggage 0-3
     */
    public void fillForm(
            String idCardNumber, String passportNumber, String firstName,
            String lastName, String birthDate, int luggage) {
        this.fillForm(idCardNumber, passportNumber);

        this.action.sendKeyInElement(FIRSTNAME_INPUT, firstName);
        this.action.sendKeyInElement(LASTNAME_INPUT, lastName);
        this.action.sendKeyInElement(BIRTHDATE_INPUT, birthDate);

        this.action.clickRadioButton(String.format(LUGGAGE_RADIO, luggage));
    }

    /**
     * fill form when auto fill is intended
     *
     * @param idCardNumber   string
     * @param passportNumber string
     */
    public void fillForm(
            String idCardNumber, String passportNumber) {
        if (this.foreignTravel()) {
            this.action.sendKeyInElement(PASSPORT_NUMBER_INPUT, passportNumber);
        } else {
            this.action.sendKeyInElement(IDCARD_NUMBER_INPUT, idCardNumber);
        }
    }

    /**
     * check if passport has to be entered
     *
     * @return true = passport required
     */
    public boolean foreignTravel() {
        return !this.action.elementPresent(IDCARD_NUMBER_INPUT);
    }

    /**
     * force input edit after pre fill
     */
    public void forceEdit() {
        this.action.clickElement(FORCE_EDIT_BUTTON);
    }

    @Override
    public void getPage() {
        this.action.clickElement(BOOKING_CONTINUE_BUTTON);
    }

    /**
     * goto next passenger
     */
    public void next() {
        this.action.clickElement(CONTINUE_BUTTON);
        if (this.currentPassenger + 1 != maxPassengers) {
            this.currentPassenger++;
        }
    }

    /**
     *
     */
    public void openTooltip() {
        this.action.clickElement(POPUP_ICON);
    }

}
