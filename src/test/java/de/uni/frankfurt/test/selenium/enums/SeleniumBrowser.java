package de.uni.frankfurt.test.selenium.enums;

/**
 * Enum für die Browser-Typen der Selenium-Tests
 */
public enum SeleniumBrowser {
  // HTML-Unit bereitet unter anderem Probleme bei Radio-Button-Feldern.
  // Safari ist nur unter Windows möglich, bereitet aber öfters beim
  // Hochfahren Probleme.
  HTML_UNIT("Html-Unit", false, false),
  FIREFOX("Firefox", true, true),
  CHROME("Chrome", true, false),
  INTERNET_EXPLORER("Internet Explorer", true, false),
  SAFARI("Safari", false, false);
  private String browserString;
  private boolean runWithWindows;
  private boolean runWithLinux;

  SeleniumBrowser(
      final String browserString, final boolean runWithWindows,
      final boolean runWithLinux) {
    this.browserString = browserString;
    this.runWithWindows = runWithWindows;
    this.runWithLinux = runWithLinux;
  }

  public boolean isRunWithWindows() {
    return runWithWindows;
  }

  public boolean isRunWithLinux() {
    return runWithLinux;
  }

  public String getBrowserString() {
    return browserString;
  }

  @Override
  public String toString() {
    return browserString;
  }
}
