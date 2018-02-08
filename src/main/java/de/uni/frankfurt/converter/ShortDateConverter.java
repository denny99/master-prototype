package de.uni.frankfurt.converter;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.ConverterException;
import javax.faces.convert.FacesConverter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@FacesConverter("de.uni.frankfurt.ShortDateConverter")
public class ShortDateConverter implements Converter {

  private static final String format = "dd.MM.yyyy";
  private static final SimpleDateFormat formatter = new SimpleDateFormat(
      format);

  @Override
  public Object getAsObject(
      FacesContext context, UIComponent component,
      String value) {

    try {
      return formatter.parse(value);
    } catch (ParseException e) {
      FacesMessage msg =
          new FacesMessage("Failed to parse Date",
              "Invalid Date format");
      msg.setSeverity(FacesMessage.SEVERITY_ERROR);
      throw new ConverterException(msg);
    }
  }

  @Override
  public String getAsString(
      FacesContext context, UIComponent component,
      Object value) {

    Date d = (Date) value;
    return formatter.format(d);
  }
}