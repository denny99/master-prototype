package de.uni.frankfurt.selenium.pages;

import de.uni.frankfurt.selenium.helper.ActionsOnPage;
import org.openqa.selenium.WebDriver;

public abstract class Page {
  protected final WebDriver driver;
  protected final ActionsOnPage action;

  protected Page(
      WebDriver driver, ActionsOnPage action) {
    this.driver = driver;
    this.action = action;
  }

  public abstract void getPage();
}
