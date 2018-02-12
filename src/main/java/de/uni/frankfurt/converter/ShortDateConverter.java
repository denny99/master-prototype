package de.uni.frankfurt.converter;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.FacesConverter;
import java.text.SimpleDateFormat;

@FacesConverter("de.uni.frankfurt.ShortDateConverter")
public class ShortDateConverter extends DateConverter {

  private static final String format = "dd.MM.yyyy";
  private static final SimpleDateFormat formatter = new SimpleDateFormat(
      format);

  @Override
  public Object getAsObject(
      FacesContext context, UIComponent component,
      String value) {

    return this.parseDate(value, formatter);
  }
}