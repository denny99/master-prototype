package de.uni.frankfurt.test.selenium.pages;

import de.uni.frankfurt.test.selenium.helper.ActionsOnPage;
import org.openqa.selenium.WebDriver;

public class FlightsOverviewPage extends Page {
  public static final String VIEW_FLIGHTS_BUTTON = "indexForm:viewFlightsButton";
  public static final String FLIGHT_SEARCH_BUTTON = "searchForm:flightSearchButton";
  public static final String SEARCH_INPUT = "searchForm:flightFilterInput";
  public static final String SORT_ORDER_SELECT = "searchForm:sortOrderSelect";
  public static final String EMPTY_SORT_ORDER_ERROR = "searchForm:sortOrderErrorMessage";
  public static final String SEARCH_TERM_ERROR = "searchForm:searchTermErrorMessage";
  public static final String FLIGHTS_DATATABLE = "datatableForm:flightsTable";
  public static final String DATATABLE_SPAN_XPATH = "//*[@id=\"datatableForm:flightsTable_row_%s\"]/td[%s]/span";
  private final Page indexPage;

  public FlightsOverviewPage(
      WebDriver driver,
      ActionsOnPage action) {
    super(driver, action);
    this.indexPage = new IndexPage(driver, action);
  }

  /**
   * @param text   text to compare
   * @param column 1 = departure 2 = arrival
   */
  public void checkDataTabelContent(String text, int column) {
    for (int i = 0; i < 10; i++) {
      String path = String.format(DATATABLE_SPAN_XPATH, i, column);
      this.action.assertTrueTextPresentInElementByXPath(path, text);
    }
  }

  @Override
  public void getPage() {
    indexPage.getPage();
    this.action.waitForElementDisplayed(VIEW_FLIGHTS_BUTTON);
    this.action.clickElement(VIEW_FLIGHTS_BUTTON);
    this.action.waitForElementDisplayed(FLIGHT_SEARCH_BUTTON);
  }

  /**
   * @param searchTerm string to search
   * @param sortOrder  datatable sort order
   */
  public void search(String searchTerm, String sortOrder) {
    this.action.selectElement(SORT_ORDER_SELECT, sortOrder);
    this.search(searchTerm);
  }

  /**
   * @param searchTerm string to search
   */
  public void search(String searchTerm) {
    this.action.sendKeyInElement(SEARCH_INPUT, searchTerm);
    this.action.clickElement(FLIGHT_SEARCH_BUTTON);
  }
}
