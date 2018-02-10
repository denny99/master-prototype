package de.uni.frankfurt.selenium.pages;

import de.uni.frankfurt.selenium.helper.ActionsOnPage;
import org.openqa.selenium.WebDriver;

public class BookingDetailsPage extends Page {
  public static final String TAC_CHECKBOX = "bookingDetails:tacCheckbox";
  public static final String TAC_CHECKBOX_TOOLTIP = "ui-tooltip-bookingDetails:tacTooltip";
  public static final String TAC_ERROR_MESSAGE = "bookingDetails:tacErrorMessage";

  public BookingDetailsPage(
      WebDriver driver,
      ActionsOnPage action) {
    super(driver, action);
  }

  /**
   * clock checkbox
   */
  public void acceptTac() {
    this.action.clickElement(TAC_CHECKBOX);
  }

  @Override
  public void getPage() {
  }
}
