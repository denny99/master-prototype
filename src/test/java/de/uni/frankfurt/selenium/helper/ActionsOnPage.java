package de.uni.frankfurt.selenium.helper;

import de.uni.frankfurt.selenium.exceptions.ElementNotDisplayedException;
import de.uni.frankfurt.selenium.exceptions.ElementNotEnabledException;
import de.uni.frankfurt.selenium.exceptions.ElementNotSelectedException;
import de.uni.frankfurt.selenium.exceptions.WantedTextNotFoundException;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertTrue;

/**
 * Hilfsklasse für die Selenium-Anweisungen - Angepasst für die Java-Projekte
 * Die Hilfsklasse führt gewöhliche Selenium-Anweisungen aus, hilft dabei aber,
 * die allgemeine Warte-/Stop-Problematik zu behben. Grundsätzlich kann man die
 * Anweisungen der ActionsOnPage Klasse verwendet, um seinen Selenium-Test zu
 * entwickeln. Es reicht wenn man die IDs kennt, weiß um welches Element es geht
 * und was damit gemacht werden soll. Mit diesen 3 Parametern kann man die
 * Methoden dieser Klasse nutzen, um einen Selenium-Test zu schreiben, der dann
 * problemlos <b>ohne</b> weitere Anpassungen funktionieren sollte!
 *
 * @author Sebastian Reinig
 * @version 22.02.2013 - 14:50
 * @since 14.02.2013
 */
public class ActionsOnPage {
  /**
   * Dauer in Sekunden, bis der selbst implementierte Timer einen Timeout hat
   */
  private static final int NUMBER_SEC_TO_WAIT = 10;
  /**
   * Muss in einer Instanz bei der Initialisierung der Klasse übergeben werden
   */
  private final WebDriver driver;
  /**
   * Wartezeit, wenn wait verwendet wird. 10 Sekunden haben einen guten
   * Richtwert ergeben, gerade bei längeren Prozeduren, die manchmal länger
   * als geplant dauern
   */
  private final WebDriverWait wait;
  /**
   * Speichert verifiactionErrors, die später im JUnit-Test ausgelesen werden
   * sollten, so dass dann fehlgeschlagene Verify-Tests zum "Fehler" führen
   */
  private final StringBuffer verificationErrors = new StringBuffer();

  /**
   * Initialisieren der Hilfs-Klasse, WebDriver-Instanz wird benötigt
   *
   * @param driver WebDriver der im Test initialisiert wurde
   */
  public ActionsOnPage(final WebDriver driver) {
    this.driver = driver;
    // Versuchte Massnahme wegen Timeout-Problemen in Hudson
    driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    wait = new WebDriverWait(driver, 10);
  }

  /**
   * Prüft und bricht falls nicht wahr ab, wenn in dem Element nicht der
   * zuprüfende Text steht
   *
   * @param elementID ID der Komponente
   * @param text      Zu prüfender Text
   */
  public void assertTrueTextPresentInElement(
      final String elementID, final String text) {
    waitForElementVisible(elementID);// Falls Element gar nicht vorhanden
    // ist
    assertTrue(driver.findElement(By.id(elementID)).getText().matches(text));
  }

  /**
   * Sichtbarkeit eines Elements abwarten, welches aber schon im DOM-Baum
   * vorhanden sein muss (ansonsten muss die Methode
   * "waitForElementExitentAndVisible verwendet werden). Die Verwendung von
   * wait.until würde hier öfters zu einem Timeout führen (wahrscheinlich,
   * weil die Sichtbarkeit event-getrieben sein könnte und es dann
   * zeitabhängig wäre, ob vor Aufruf der wait-Methode das event bereits
   * gefeuert wurde oder nicht). Stattdessen wird hier der findElement-Befehl
   * verwendet, der ein implizites Timeout-Handling hat. Dieses wird im
   * Konstruktor gesetzt.
   *
   * @param elementID ID der Komponente
   */
  public void waitForElementVisible(final String elementID) {
    // wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(elementID)));
    // Versuch wegen HudsonTimeout-Problematik
    driver.findElement(By.id(elementID));
  }

  /**
   * Prüft und bricht falls nicht wahr ab, wenn in dem Element nicht der
   * zuprüfende Text steht
   *
   * @param xpath XPath der Komponente
   * @param text  Zu prüfender Text
   */
  public void assertTrueTextPresentInElementByXPath(
      final String xpath, final String text) {
    waitForElementVisibleByXPath(xpath);// Falls Element gar nicht vorhanden
    // ist
    assertTrue(driver.findElement(By.xpath(xpath)).getText().matches(text));
  }

  /**
   * Sichtbarkeit eines Elements abwarten, welches aber schon im DOM-Baum
   * vorhanden sein muss (ansonsten muss die Methode
   * "waitForElementExitentAndVisible verwendet werden). Die Verwendung von
   * wait.until würde hier öfters zu einem Timeout führen (wahrscheinlich,
   * weil die Sichtbarkeit event-getrieben sein könnte und es dann
   * zeitabhängig wäre, ob vor Aufruf der wait-Methode das event bereits
   * gefeuert wurde oder nicht). Stattdessen wird hier der findElement-Befehl
   * verwendet, der ein implizites Timeout-Handling hat. Dieses wird im
   * Konstruktor gesetzt.
   *
   * @param elementID ID der Komponente
   */
  public void waitForElementVisibleByXPath(final String elementID) {
    // wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(elementID)));
    // Versuch wegen HudsonTimeout-Problematik
    driver.findElement(By.xpath(elementID));
  }

  /**
   * Prüft, ob ein bestimmter Text auf der Seite im Body-Container vorhanden
   * ist, wenn nicht wird an dieser Stelle abgebrochen
   *
   * @param text Text der im Body gesucht wird und wenn nicht vorhanden, ein
   *             Abbruch durchgeführt wird
   */
  public void assertTrueTextPresentOnPage(final String text) {
    assertTrue(driver.findElement(By.cssSelector("BODY"))
        .getText()
        .matches("^[\\s\\S]*" + text + "[\\s\\S][\\s\\S]*$"));// Liefert
    // Fehler,
    // wenn
    // Text
    // nicht
    // gefunden
    // wird.
  }

  /**
   * Führt einen Click auf eine Checkbox aus Falls der Klick das erste mal
   * nicht funktioniert werden max. 4 weitere Versuche durchgeführt. (Probleme
   * bei KKK und CC sollen damit behoben werden)
   *
   * @param elementID
   */
  public void clickCheckBox(final String elementID) {
    waitForElementExistentAndVisible(elementID);
    waitForElementDisplayed(elementID);
    waitForElementEnabled(elementID);
    wait.until(ExpectedConditions.elementToBeClickable(By.id(elementID)));
    driver.findElement(By.id(elementID)).click();
    waitForElementExistentAndVisible(elementID);
    waitForElementDisplayed(elementID);
    waitForElementEnabled(elementID);
    int i = 1;
    while (!driver.findElement(By.id(elementID)).isSelected()) {
      waitForElementExistentAndVisible(elementID);
      waitForElementDisplayed(elementID);
      waitForElementEnabled(elementID);
      wait.until(ExpectedConditions.elementToBeClickable(By.id(elementID)));
      driver.findElement(By.id(elementID)).click();
      waitForElementExistentAndVisible(elementID);
      waitForElementDisplayed(elementID);
      waitForElementEnabled(elementID);
      if (i == 3) {
        break;
      }
      i++;
    }
  }

  /**
   * Diese Warte-Methode kann aufgerufen werden, wenn das Element zu Beginn
   * noch nicht im DOM-Baum der Seite vorhanden ist. Es wird solange gewartet,
   * bis das Element vorhanden und sichtbar ist.
   *
   * @param elementID
   */
  public void waitForElementExistentAndVisible(final String elementID) {
    // Wartet, bis Element vorhanden und sichtbar ist
    try {
      wait.until(ExpectedConditions.not(
          ExpectedConditions.invisibilityOfElementLocated(By.id(elementID))));
    } catch (final Exception e) {
      // Erneuter Versuch, da Element schon sichtbar gewesen sein könnte
      // und das Sichtbarkeits-Event bereits vorher gefeuert sein könnte
      // (wahrscheinlich ist die Sichtbarkeitsüberprüfung event-getrieben)
      // und daher beim wait.until-Befehl ein Timeout verursacht werden
      // könnte.
      waitForElementVisible(elementID);
    }
  }

  /**
   * Wartet auf das Displayen eines Elements mit eigenem Timeout.
   *
   * @param elementID
   */
  public void waitForElementDisplayed(final String elementID) {
    boolean displayed = false;
    final long initialTime = System.currentTimeMillis();
    while (System.currentTimeMillis() - initialTime <
        1000 * NUMBER_SEC_TO_WAIT) {
      // Massnahme, damit das System nicht überlastet wird
      try {
        Thread.sleep(TimeUnit.SECONDS.toMillis(1));
      } catch (final InterruptedException e1) {
        throw new RuntimeException("Thread-Sleep wurde unterbrochen", e1);
      }
      final boolean currentElementDisplayed = driver.findElement(
          By.id(elementID)).isDisplayed();
      if (currentElementDisplayed) {
        displayed = true;
        break;
      }
    }
    if (!displayed) {
      throw new ElementNotDisplayedException(
          "Das Element mit der ID '" + elementID + " ist nicht displayed.");
    }
  }

  /**
   * Wartet auf das Enablen eines Elements mit eigenem Timeout.
   *
   * @param elementID
   */
  public void waitForElementEnabled(final String elementID) {
    boolean enabled = false;
    final long initialTime = System.currentTimeMillis();
    while (System.currentTimeMillis() - initialTime <
        1000 * NUMBER_SEC_TO_WAIT) {
      // Massnahme, damit das System nicht überlastet wird
      try {
        Thread.sleep(TimeUnit.SECONDS.toMillis(1));
      } catch (final InterruptedException e1) {
        throw new RuntimeException("Thread-Sleep wurde unterbrochen", e1);
      }
      final boolean currentElementEnabled = driver.findElement(By.id(elementID))
          .isEnabled();
      if (currentElementEnabled) {
        enabled = true;
        break;
      }
    }
    if (!enabled) {
      throw new ElementNotEnabledException(
          "Das Element mit der ID '" + elementID + " ist nicht enabled.");
    }
  }

  /**
   * Führt einen click aus, prüft automatisch vorher, ob das Element sichtbar
   * und clickbar ist
   *
   * @param elementID ID der Komponente
   */
  public void clickElement(final String elementID) {
    waitForElementExistentAndVisible(elementID);
    waitForElementDisplayed(elementID);
    waitForElementEnabled(elementID);
    wait.until(
        ExpectedConditions.elementToBeClickable(By.id(elementID)));// Bricht
    // ab
    // wenn
    // Button
    // nicht
    // klickbar
    driver.findElement(By.id(elementID)).click();
  }

  /**
   * Führt einen Click auf einenn Radio-Button aus Falls der Klick das erste
   * mal nicht funktioniert werden max. 4 weitere Versuche durchgeführt.
   * (Probleme bei KKK und CC sollen damit behoben werden)
   *
   * @param elementID
   */
  public void clickRadioButton(final String elementID) {
    waitForElementExistentAndVisible(elementID);
    waitForElementDisplayed(elementID);
    waitForElementEnabled(elementID);
    wait.until(ExpectedConditions.elementToBeClickable(By.id(elementID)));
    driver.findElement(By.id(elementID)).click();
    waitForElementExistentAndVisible(elementID);
    waitForElementDisplayed(elementID);
    waitForElementEnabled(elementID);
    int i = 1;
    while (!driver.findElement(By.id(elementID)).isSelected()) {
      waitForElementExistentAndVisible(elementID);
      waitForElementDisplayed(elementID);
      waitForElementEnabled(elementID);
      wait.until(ExpectedConditions.elementToBeClickable(By.id(elementID)));
      driver.findElement(By.id(elementID)).click();
      waitForElementExistentAndVisible(elementID);
      waitForElementDisplayed(elementID);
      waitForElementEnabled(elementID);
      if (i == 3) {
        break;
      }
      i++;
    }
  }

  /**
   * Prüft ob Element auf der Seite vorhanden ist und liefert true oder false.
   * Bricht aber nicht ab
   *
   * @param elementId
   * @return
   */
  public boolean elementPresent(final String elementId) {
    boolean b = false;
    try {
      // wait a bit before checking
      this.waitForElementDisplayed(elementId);
      b = driver.findElement(By.id(elementId)).isDisplayed();
    } catch (final Exception e) {
      b = false;
    }
    return b;
  }

  /**
   * Prüft stärker mittels Warte-Routinen, ob das Element auf der Seite
   * vorhanden ist, displayet wird und enabled ist und liefert true oder
   * false. Bricht aber nicht ab.
   *
   * @param elementId
   * @return
   */
  public boolean elementPresentAndEnabled(final String elementId) {
    boolean result = true;
    try {
      waitForElementExistentAndVisible(elementId);
      waitForElementDisplayed(elementId);
      waitForElementEnabled(elementId);
    } catch (final Exception e) {
      result = false;
    }
    return result;
  }

  /**
   * Auslesen eines Attributs
   *
   * @param elementID
   * @param attribute
   * @return String = Den Inhalt des Elements mit dem ausgewählten Attribut
   */
  public String getAttributeFromElement(
      final String elementID, final String attribute) {
    return driver.findElement(By.id(elementID)).getAttribute(attribute);
  }

  /**
   * Öffnet eine Seite, nach dem Schema baseUrl + appUrl ("localhost" +
   * "/App/")
   *
   * @param baseUrl URL zum Server z.B. localhost:80
   * @param appUrl  PFad zur Applikation z.B. /Vertriebsfrontend/
   */
  public void openPage(final String baseUrl, final String appUrl) {
    driver.get(baseUrl + appUrl);
  }

  /**
   * Dropdown-Funktionalität Warten auf Sichtbarkeit und warten, ob Element
   * korrekt ausgewählt wurde, ansonsten Abbruch
   *
   * @param elementID ID der Komponente
   * @param value     Auszuwählender Wert
   */
  public void selectElement(final String elementID, final String value) {
    waitForElementVisible(elementID);
    waitForElementDisplayed(elementID);
    waitForElementEnabled(elementID);
    new Select(driver.findElement(By.id(elementID))).selectByVisibleText(value);
    waitForTextPresentInElement(elementID, value, null);
  }

  /**
   * Zuerst wird mittels wait.until überprüft, ob sich der gewünschte Text im
   * Feld befindet. Wenn dies nicht funktioniert, wird die Überprüfung manuell
   * mit einem selbst programmierten Timer vorgenommen. Damit es bei der
   * wiederholten Prüfung zu keiner Überlastung des Systems kommen kann, wird
   * die Prüfung nur jede Sekunde durchgeführt. Sollte der betreffende Text
   * dann immer noch nicht gefunden werden, wird eine
   * WantedTextNotFoundException geworfen, welche eine eigene RuntimeException
   * ist.
   *
   * @param elementID
   * @param value
   * @param formattedValue Durch Eingabe von Tab kommt es gelegentlich zu einer
   *                       Formatierung (z.B. Tausendertrennzeichen). Wenn formattedValue
   *                       mit angegeben wird, dann wird die eingegebene Zeichenkette
   *                       auch mit diesem Wert verglichen. Wenn es NULL ist, wird es
   *                       ignoriert.
   */
  public void waitForTextPresentInElement(
      final String elementID, final String value, final String formattedValue) {
    try {
      wait.until(ExpectedConditions.textToBePresentInElement(By.id(elementID),
          value));// Bricht
      // ab
      // wenn
      // nicht
      // value
      // in
      // dem
      // Element steht
    } catch (final Exception e) {
      // Es kann ein Timeout eintreten, wenn das Event, dass der Text
      // enthalten ist, schon vorher eingetreten ist (wahrscheinlich liegt
      // hier ein event-Mechanismus vor).
      // Dann vergleiche manuell den Text. Dazu wird ein eigener Timeout
      // verwendet, der
      // die Überprüfung soviele Sekunden wiederholt durchführt, wie in
      // der Konstanten
      // NUMBER_SEC_TO_WAIT_FOR_ATTRIBUTE angegeben.
      final WebElement currentElement = driver.findElement(By.id(elementID));
      if (currentElement == null) {
        throw new WantedTextNotFoundException(
            "Das Element mit der ID " + elementID + " is NULL.");
      }
      final long initialTime = System.currentTimeMillis();
      boolean gewuenschterInhaltAufgetreten = false;
      String currentText = null;
      System.out.println("Beginn des manuellen Textvergleichs");
      while (System.currentTimeMillis() - initialTime <
          1000 * NUMBER_SEC_TO_WAIT) {
        System.out.println(
            "gewuenschterInhaltAufgetreten: " + gewuenschterInhaltAufgetreten);
        // Massnahme, damit das System nicht überlastet wird
        try {
          Thread.sleep(TimeUnit.SECONDS.toMillis(1));
        } catch (final InterruptedException e1) {
          throw new RuntimeException("Thread-Sleep wurde unterbrochen", e1);
        }
        currentText = currentElement.getText();
        System.out.println("currentText: " + currentText + "; value: " + value +
            "; formattedValue: " + formattedValue);
        if ((currentText != null) &&
            (compareValuesIncludingFormatting(currentText, value,
                formattedValue))) {
          System.out.println("Treffer gefunden");
          gewuenschterInhaltAufgetreten = true;
          break;
        }
      }
      if (!gewuenschterInhaltAufgetreten) {
        throw new WantedTextNotFoundException(
            "Der Text des Elements mit der ID '" + elementID
                + "' hat nicht den gewünschten Wert '" + value + "'"
                + ((currentText != null) ?
                (", sondern den Wert: '" + currentText) + "'" :
                "."));
      }
    }
  }

  private boolean compareValuesIncludingFormatting(
      final String valueToCompare, final String value,
      final String formattedValue) {
    // Es wird vorausgesetzt, dass valueToCompare nicht null ist.
    if (valueToCompare.equals(value)) {
      return true;
    }
    return (formattedValue != null) && (valueToCompare.equals(formattedValue));
  }

  /**
   * Z.b. durch auslesen mittels Firebug kann man falls die
   * Dropbdownfunktionalität mit ID und value nicht ausreichend ist, einen
   * Xpath ausdrück verwenden Hier muss man beachten, dass die
   * Wait-Problematik ggf. manuell abfangen
   *
   * @param xpath
   * @param index Den Index der jeweiligen Option
   */
  public void selectElementByXpath(final String xpath, final int index) {
    new Select(driver.findElement(By.xpath(xpath))).selectByIndex(index);
  }

  /**
   * Wie die andere sendKeyInElement-Methode, nur dass keine Überprüfung auf
   * einen formatierten Inhalt nach Eingabe von Tab erfolgt.
   *
   * @param elementID ID der Komponente
   * @param value     wird in die Komponente geschrieben
   */
  public void sendKeyInElement(final String elementID, final String value) {
    sendKeyInElement(elementID, value, null);
  }

  /**
   * WebElement mit der angegebenen ID wird gesucht und dann die value via
   * SendKeys eingetragen Vorher wird auf die Sichtbarkeit des Elements
   * geprüft, sowie am Ende, dass die Value auch wirklich eingetragen wurde
   * Beide Prüfungen sind Abbruchkriterien (Warte auf Sichtbarkeit und Warte
   * ob Value in Element steht) Das Ganze wird 2 mal versucht, weil das lange
   * Initialisieren der Kreditbedarfseite dazu führt, dass das Reinschreiben
   * der OBG in das betreffende Feld sonst nicht funktioniert. Der innere
   * mehrfache Versuch des Reinschreibens genügt bei der Kreditbedarfseite
   * beim Test auf dem Hudson nicht.
   *
   * @param elementID      ID der Komponente
   * @param value          wird in die Komponente geschrieben
   * @param formattedValue Durch Eingabe von Tab kommt es gelegentlich zu einer
   *                       Formatierung (z.B. Tausendertrennzeichen). Wenn formattedValue
   *                       mit angegeben wird, dann wird die eingegebene Zeichenkette
   *                       auch mit diesem Wert verglichen.
   */
  public void sendKeyInElement(
      final String elementID, final String value, final String formattedValue) {
    int numberOfAttempts = 0;
    boolean attemptSuccessful = false;
    while ((numberOfAttempts < 2) && !attemptSuccessful) {
      attemptSuccessful = true;
      numberOfAttempts++;
      waitForElementVisible(elementID);
      waitForElementDisplayed(elementID);
      waitForElementEnabled(elementID);
      driver.findElement(By.id(elementID)).clear();
      driver.findElement(By.id(elementID)).sendKeys(value + Keys.TAB);
      int i = 1;
      while (
          (driver.findElement(By.id(elementID)).getAttribute("value") == null)
              || (!compareValuesIncludingFormatting(driver.findElement(
              By.id(elementID)).getAttribute("value"),
              value, formattedValue))) {
        waitForElementVisible(elementID);
        waitForElementDisplayed(elementID);
        waitForElementEnabled(elementID);
        driver.findElement(By.id(elementID)).clear();
        driver.findElement(By.id(elementID)).sendKeys(value + Keys.TAB);
        if (i == 3) {
          break;
        }
        i++;
      }
      try {
        waitForTextPresentInElementValue(elementID, value, formattedValue);
        // Element steht
      } catch (final WantedTextNotFoundException e) {
        if (numberOfAttempts > 1) {
          // Beim zweiten Fehlerversuch soll es fehlschlagen.
          throw e;
        }
        attemptSuccessful = false;
      }
    }
  }

  /**
   * Zuerst wird mittels wait.until überprüft, ob sich der gewünschte Text im
   * Feld befindet. Wenn dies nicht funktioniert, wird die Überprüfung manuell
   * mit einem selbst programmierten Timer vorgenommen. Damit es bei der
   * wiederholten Prüfung zu keiner Überlastung des Systems kommen kann, wird
   * die Prüfung nur jede Sekunde durchgeführt. Sollte der betreffende Text
   * dann immer noch nicht gefunden werden, wird eine
   * WantedTextNotFoundException geworfen, welche eine eigene RuntimeException
   * ist.
   *
   * @param elementID
   * @param value
   * @param formattedValue Durch Eingabe von Tab kommt es gelegentlich zu einer
   *                       Formatierung (z.B. Tausendertrennzeichen). Wenn formattedValue
   *                       mit angegeben wird, dann wird die eingegebene Zeichenkette
   *                       auch mit diesem Wert verglichen. Wenn es NULL ist, wird es
   *                       ignoriert.
   */
  public void waitForTextPresentInElementValue(
      final String elementID, final String value, final String formattedValue) {
    try {
      wait.until(
          ExpectedConditions.textToBePresentInElementValue(By.id(elementID),
              value));// Bricht
      // ab
      // wenn
      // nicht
      // value
      // in
      // dem
      // Element steht
    } catch (final Exception e) {
      // Es kann ein Timeout eintreten, wenn das Event, dass der Text
      // enthalten ist, schon vorher eingetreten ist (wahrscheinlich liegt
      // hier ein event-Mechanismus vor).
      // Dann vergleiche manuell den Text. Dazu wird ein eigener Timeout
      // verwendet, der
      // die Überprüfung soviele Sekunden wiederholt durchführt, wie in
      // der Konstanten
      // NUMBER_SEC_TO_WAIT_FOR_ATTRIBUTE angegeben.
      final WebElement currentElement = driver.findElement(By.id(elementID));
      if (currentElement == null) {
        throw new WantedTextNotFoundException(
            "Das Element mit der ID " + elementID + " is NULL.");
      }
      final long initialTime = System.currentTimeMillis();
      boolean gewuenschterInhaltAufgetreten = false;
      String currentValueAttribute = null;
      System.out.println("Beginn des manuellen Textvergleichs");
      while (System.currentTimeMillis() - initialTime <
          1000 * NUMBER_SEC_TO_WAIT) {
        System.out.println(
            "gewuenschterInhaltAufgetreten: " + gewuenschterInhaltAufgetreten);
        // Massnahme, damit das System nicht überlastet wird
        try {
          Thread.sleep(TimeUnit.SECONDS.toMillis(1));
        } catch (final InterruptedException e1) {
          throw new RuntimeException("Thread-Sleep wurde unterbrochen", e1);
        }
        currentValueAttribute = currentElement.getAttribute("value");
        System.out.println(
            "currentValueAttribute: " + currentValueAttribute + "; value: " +
                value + "; formattedValue: "
                + formattedValue);
        if ((currentValueAttribute != null) &&
            (compareValuesIncludingFormatting(currentValueAttribute, value,
                formattedValue))) {
          System.out.println("Treffer gefunden");
          gewuenschterInhaltAufgetreten = true;
          break;
        }
      }
      if (!gewuenschterInhaltAufgetreten) {
        throw new WantedTextNotFoundException(
            "Das value-Attribut des Elements mit der ID '" + elementID
                + "' hat nicht den gewünschten Wert '" + value + "'"
                + ((currentValueAttribute != null) ?
                (", sondern den Wert: '" + currentValueAttribute) + "'" :
                "."));
      }
    }
  }

  public void tearDown() {
    driver.quit();
    // GET Errors from ActionsOnPage
    final String verificationErrorString = getVerificationErros().toString();
    if (!"".equals(verificationErrorString)) {
      Assert.fail(verificationErrorString);
    }
  }

  /**
   * Für TearDown gedacht, dann können die gesammelten Fehler (z.B. bei
   * verify) ausgegeben werden, die dann nachträglich zum Abbruch führen
   *
   * @return Stringbuffer verificationErros
   */
  public StringBuffer getVerificationErros() {
    return this.verificationErrors;
  }

  /**
   * Liefert true, wenn der übergebene Text auf der Seite vorhanden ist. Kann
   * verwendet werden, um zu überprüfen, ob ein Vorgang das Korrekte Ereignis
   * ausgelöst hat, z.B. ob Formular xy erschienen ist
   *
   * @param text
   * @return
   */
  public boolean textPresent(final String text) {
    boolean b = false;
    try {
      b = driver.findElement(By.cssSelector("BODY"))
          .getText()
          .matches("^[\\s\\S]*" + text + ":[\\s\\S]*$");
    } catch (final Exception e) {
      b = false;
    }
    return b;
  }

  /**
   * Verifziert, ob aus Auswahlliste mit der gegebenen elementID ein Feld mit
   * dem Wert von value ausgewählt wurde. Zuerst wird überprüft, ob das
   * Element vorhanden ist.
   *
   * @param elementID
   * @param value
   */
  public void verifySelectedOption(final String elementID, final String value) {
    waitForElementVisible(elementID);// Falls Element gar nicht vorhanden
    // ist, dann wird auch abgebrochen!
    final List<WebElement> selectedOptions = (new Select(driver.findElement(
        By.id(elementID)))).getAllSelectedOptions();
    String resultOptionText = null;
    if ((selectedOptions != null) && (selectedOptions.size() > 0)) {
      resultOptionText = selectedOptions.get(0).getText();
      if (resultOptionText != null) {
        try {
          assertTrue(resultOptionText.matches(value));
        } catch (final Error e) {
          verificationErrors.append(
              "verifySelectedOption - Text in ausgewählter Option nicht gefunden: '" +
                  resultOptionText
                  + "' - " + e.toString());// wird
          // dann
          // als
          // Fehler
          // dargestellt
        }
      } else {
        try {
          Assert.assertNull(value);
        } catch (final Error e) {
          verificationErrors.append(
              "verifySelectedOption - Text in ausgewählter Option ist NULL, aber erwarteter Text ist nicht NULL; erwarter Text '"
                  + value + "' - " + e.toString());// wird
          // dann
          // als
          // Fehler
          // dargestellt
        }
      }
    }
  }

  /**
   * Verify für Elemente und deren "Inhalt". Abbruch wenn nicht wahr erst am
   * Ende
   *
   * @param elementID ID der Komponente
   * @param text      Zu prüfender Text
   */
  public void verifyTrueTextPresentInElement(
      final String elementID, final String text) {
    waitForElementVisible(elementID);// Falls Element gar nicht vorhanden
    // ist, dann wird auch abgebrochen!
    try {
      assertTrue(driver.findElement(By.id(elementID)).getText().matches(text));
    } catch (final Error e) {
      verificationErrors.append(
          "verifyTrueTextPresentInElement - Text in Element nicht gefunden: '" +
              text + "' - " + e.toString());// wird
      // dann
      // als
      // Fehler
      // dargestellt
    }
  }

  /**
   * Bricht im Gegensatz zu assert nicht sofort ab, sondern erst am Ende des
   * Tests
   *
   * @param text Seiehe assertTrue, nur ohne sofortigen Abbricht
   */
  public void verifyTrueTextPresentOnPage(final String text) {
    try {
      assertTrue(driver.findElement(By.cssSelector("BODY"))
          .getText()
          .matches("^[\\s\\S]*" + text + "[\\s\\S][\\s\\S]*$"));
    } catch (final Error e) {
      verificationErrors.append(
          "verifyTrueTextPresentOnPage - Text nicht gefunden: '" + text +
              "' - " + e.toString());// wird
      // dann
      // als
      // Fehler
      // dargestellt
    }
  }

  /**
   * Verifiziert, ob das Value-Attribut den angegebenen Text besitzt.
   *
   * @param elementID ID der Komponente
   * @param text      Zu prüfender Text
   */
  public void verifyValueAttributeInElement(
      final String elementID, final String text) {
    waitForElementVisible(elementID);// Falls Element gar nicht vorhanden
    // ist, dann wird auch abgebrochen!
    final String attribute = driver.findElement(By.id(elementID))
        .getAttribute("value");
    if (attribute != null) {
      try {
        assertTrue(attribute.matches(text));
      } catch (final Error e) {
        verificationErrors.append(
            "verifyTrueTextPresentInElement - Text in Element nicht gefunden: '" +
                text + "' - "
                + e.toString());// wird
        // dann
        // als
        // Fehler
        // dargestellt
      }
    } else {
      try {
        Assert.assertNull(text);
      } catch (final Error e) {
        verificationErrors.append(
            "verifyValueAttributeInElement - Value-Attribut ist NULL, aber erwarteter Text ist nicht NULL; erwarter Text '"
                + text + "' - " + e.toString());// wird
        // dann
        // als
        // Fehler
        // dargestellt
      }
    }
  }

  /**
   * Wartet auf das Selektieren eines Elements mit eigenem Timeout.
   *
   * @param elementID
   */
  public void waitForElementSelected(final String elementID) {
    boolean selected = false;
    final long initialTime = System.currentTimeMillis();
    while (System.currentTimeMillis() - initialTime <
        1000 * NUMBER_SEC_TO_WAIT) {
      // Massnahme, damit das System nicht überlastet wird
      try {
        Thread.sleep(TimeUnit.SECONDS.toMillis(1));
      } catch (final InterruptedException e1) {
        throw new RuntimeException("Thread-Sleep wurde unterbrochen", e1);
      }
      final boolean currentElementSelected = driver.findElement(
          By.id(elementID)).isSelected();
      if (currentElementSelected) {
        selected = true;
        break;
      }
    }
    if (!selected) {
      throw new ElementNotSelectedException(
          "Das Element mit der ID '" + elementID + " ist nicht selected.");
    }
  }

  /**
   * Wie die andere waitForTextPresentInElementValue-Methode, nur dass keine
   * Überprüfung auf einen formatierten Inhalt nach Eingabe von Tab erfolgt.
   *
   * @param elementID ID der Komponente
   * @param value     Zu vergleichender Wert
   */
  public void waitForTextPresentInElementValue(
      final String elementID, final String value) {
    waitForTextPresentInElementValue(elementID, value, null);
  }
}
