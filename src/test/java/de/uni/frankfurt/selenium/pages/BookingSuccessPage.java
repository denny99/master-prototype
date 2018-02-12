package de.uni.frankfurt.selenium.pages;

import de.uni.frankfurt.selenium.helper.ActionsOnPage;
import org.openqa.selenium.WebDriver;

public class BookingSuccessPage extends Page {
  public static final String INFO_POPUP = "bookingDetails:infoPopup_main";
  public static final String INFO_OK_BUTTON = "bookingDetails:as_info_ok";
  public static final String FINISH_BUTTION = "bookingDetails:finishButton";
  public static final String SUCCESS_MESSAGE = "bookingCompleteMessage";
  public static final String SUCCESS_BUTTON = "successInfo:completeButton";

  public BookingSuccessPage(
      WebDriver driver,
      ActionsOnPage action) {
    super(driver, action);
  }

  /**
   *
   */
  public void completeBooking() {
    this.action.clickElement(SUCCESS_BUTTON);
  }

  @Override
  public void getPage() {
    this.getPage(false);
  }

  /**
   * @param validationError true if the form should have an error
   */
  public void getPage(boolean validationError) {
    this.action.clickElement(FINISH_BUTTION);

    if (!validationError) {
      this.action.waitForElementVisible(INFO_POPUP);
      this.action.clickElement(INFO_OK_BUTTON);
    }
  }
}
