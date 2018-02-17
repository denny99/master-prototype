package de.uni.frankfurt.test.selenium.pages;

import de.uni.frankfurt.test.selenium.helper.ActionsOnPage;
import de.uni.frankfurt.test.selenium.helper.SetupSeleniumDriver;
import org.openqa.selenium.WebDriver;

public class IndexPage extends Page {
  public IndexPage(
      WebDriver driver,
      ActionsOnPage action) {
    super(driver, action);
  }

  @Override
  public void getPage() {
    this.action.openPage(SetupSeleniumDriver.getBaseUrl(), "/");
  }
}
