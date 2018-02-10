package de.uni.frankfurt.selenium.test;

import de.uni.frankfurt.selenium.enums.SeleniumBrowser;
import de.uni.frankfurt.selenium.helper.ActionsOnPage;
import de.uni.frankfurt.selenium.helper.SetupSeleniumDriver;
import de.uni.frankfurt.selenium.pages.*;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

import java.util.logging.Level;
import java.util.logging.Logger;

public class FlightsTests {
  public static final String SEARCH_WORD = "Berlin";

  private ActionsOnPage action;
  private FlightsOverviewPage flightsOverviewPage;
  private FlightDetailsPage flightDetailsPage;
  private BookingFormPage bookingFormPage;
  private PassengerFormPage passengerFormPage;
  private BookingDetailsPage bookingDetailsPage;
  private BookingSuccessPage bookingSuccessPage;

  @Before
  public void setUp() {
    final Logger logger = Logger.getLogger("");
    logger.setLevel(Level.WARNING);
    WebDriver driver = SetupSeleniumDriver.getCurrentBrowserDriver(
        SeleniumBrowser.CHROME);
    this.action = new ActionsOnPage(driver);
    this.flightsOverviewPage = new FlightsOverviewPage(driver, this.action);
    this.flightDetailsPage = new FlightDetailsPage(driver, this.action);
    this.bookingFormPage = new BookingFormPage(driver, this.action);
    this.passengerFormPage = new PassengerFormPage(driver, this.action);
    this.bookingDetailsPage = new BookingDetailsPage(driver, this.action);
    this.bookingSuccessPage = new BookingSuccessPage(driver, this.action);
  }

  /**
   * Sollte so für jeden Test übernommen, werden, damit alle Errors abgefangen
   * werden
   */
  @After
  public void tearDown() {
    this.action.tearDown();
  }

  @Test
  public void test1() {
    this.flightsOverviewPage.getPage();
    Assert.assertTrue(
        this.action.elementPresent(FlightsOverviewPage.FLIGHT_SEARCH_BUTTON));

    // search with empty sort order
    this.flightsOverviewPage.search(SEARCH_WORD);
    Assert.assertTrue(
        this.action.elementPresent(FlightsOverviewPage.EMPTY_SORT_ORDER_ERROR));

    // search with invalid input
    this.flightsOverviewPage.search("Berlin1234", "Ascending");
    Assert.assertTrue(
        this.action.elementPresent(FlightsOverviewPage.SEARCH_TERM_ERROR));

    // search with input
    this.flightsOverviewPage.search(SEARCH_WORD, "Ascending");
    Assert.assertTrue(
        this.action.elementPresent(FlightsOverviewPage.FLIGHTS_DATATABLE));
    this.flightsOverviewPage.checkDataTabelContent(SEARCH_WORD, 2);

    // view flight
    this.flightDetailsPage.getPage();
    Assert.assertTrue(
        this.action.elementPresent(FlightDetailsPage.FLIGHT_DETAILS_CONTAINER));

    // go back
    this.flightDetailsPage.back();
    Assert.assertTrue(
        this.action.elementPresent(FlightsOverviewPage.FLIGHTS_DATATABLE));

    // start booking process
    this.bookingFormPage.getPage();
    Assert.assertTrue(
        this.action.elementPresent(BookingFormPage.PASSENGER_COUNT_OUTPUT));

    // cancel booking
    this.bookingFormPage.cancel();
    Assert.assertTrue(
        this.action.elementPresent(FlightsOverviewPage.FLIGHTS_DATATABLE));

    // start booking
    this.bookingFormPage.getPage();

    // invalid string
    this.bookingFormPage.setPassengerAmount("wasd");
    Assert.assertTrue(
        this.action.elementPresent(BookingFormPage.COST_ERROR_MESSAGE));
    this.action.assertTrueTextPresentInElement(
        BookingFormPage.COST_ERROR_MESSAGE, BookingFormPage.INVALID_INPUT);

    // too many passengers
    this.bookingFormPage.setPassengerAmount("1000000");
    Assert.assertTrue(
        this.action.elementPresent(BookingFormPage.COST_ERROR_MESSAGE));

    // hover over info bubble for tooltip
    this.bookingFormPage.showToolTip();
    Assert.assertTrue(
        this.action.elementPresent(BookingFormPage.PASSENGER_TOOLTIP));

    // correct input
    this.bookingFormPage.setPassengerAmount("2");
    Assert.assertTrue(
        this.action.elementPresent(BookingFormPage.COST_ERROR_MESSAGE));

    // open passenger form
    this.passengerFormPage.getPage();
    Assert.assertTrue(
        this.action.elementPresent(PassengerFormPage.FIRSTNAME_INPUT));

    // open and close popup
    this.passengerFormPage.openTooltip();
    Assert.assertTrue(
        this.action.elementPresent(PassengerFormPage.PASSPORT_HELP_POPUP));
    this.passengerFormPage.openTooltip();

    // no input
    this.passengerFormPage.next();
    Assert.assertTrue(
        this.action.elementPresent(PassengerFormPage.FIRSTNAME_ERROR_MESSAGE));
    Assert.assertTrue(
        this.action.elementPresent(PassengerFormPage.LASTNAME_ERROR_MESSAGE));
    Assert.assertTrue(
        this.action.elementPresent(PassengerFormPage.BIRTHDATE_ERROR_MESSAGE));
    if (this.passengerFormPage.foreignTravel()) {
      Assert.assertTrue(
          this.action.elementPresent(PassengerFormPage.PASSPORT_ERROR_MESSAGE));
    } else {
      Assert.assertTrue(
          this.action.elementPresent(PassengerFormPage.IDCARD_ERROR_MESSAGE));
    }

    // pre fill data and force edit
    this.passengerFormPage.fillForm("12345", "P12345");
    Assert.assertTrue(!this.action.elementPresentAndEnabled(
        PassengerFormPage.FIRSTNAME_INPUT));
    this.passengerFormPage.forceEdit();
    Assert.assertTrue(this.action.elementPresentAndEnabled(
        PassengerFormPage.FIRSTNAME_INPUT));

    // accept input
    this.passengerFormPage.next();

    // fill new second passenger
    this.passengerFormPage.fillForm("12341", "P12341", "Test", "Testonius",
        "01.01.1993", 2);
    this.passengerFormPage.next();

    // don't accept TAC
    this.bookingSuccessPage.getPage(true);
    Assert.assertTrue(
        this.action.elementPresent(BookingDetailsPage.TAC_ERROR_MESSAGE));

    // accept TAC
    // hover over checkbox for tooltip
    this.bookingDetailsPage.acceptTac();
    Assert.assertTrue(
        this.action.elementPresent(BookingDetailsPage.TAC_CHECKBOX_TOOLTIP));

    // confirm dialog
    this.bookingSuccessPage.getPage();
    Assert.assertTrue(
        this.action.elementPresent(BookingSuccessPage.SUCCESS_MESSAGE));

    // back to datatable
    this.bookingSuccessPage.completeBooking();
    Assert.assertTrue(
        this.action.elementPresent(FlightsOverviewPage.FLIGHTS_DATATABLE));

    // tests complete
  }
}