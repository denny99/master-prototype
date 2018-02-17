package de.uni.frankfurt.database.entity;


import de.uni.frankfurt.json.annotations.JsonField;
import de.uni.frankfurt.json.annotations.JsonObject;
import de.uni.frankfurt.util.ThreadLocalRandom;

import java.util.Date;

@JsonObject
public class Passenger {
  @JsonField(
      required = true,
      maxLength = 16
  )
  private String id;
  @JsonField(
      required = true,
      maxLength = 32,
      readOnly = true
  )
  private String firstName;
  @JsonField(
      required = true,
      maxLength = 32
  )
  private String lastName;
  @JsonField(
      required = true,
      pattern = "\\d{5}"
  )
  private String idCardNumber;
  @JsonField(
      required = true,
      pattern = "P\\d{5}"
  )
  private String passportNumber;
  @JsonField(
      required = true
  )
  private Date birthDay;
  @JsonField(
      required = true,
      enumerable = {"0", "1", "2", "3"}
  )
  private int luggageCount;

  public Passenger() {
  }

  public Passenger(
      String firstName, String lastName, String idCardNumber,
      String passportNumber, Date birthDay, int luggageCount) {
    this.id = String.valueOf(
        ThreadLocalRandom.nextInt(0, 100000000 + 1));
    this.firstName = firstName;
    this.lastName = lastName;
    this.idCardNumber = idCardNumber;
    this.passportNumber = passportNumber;
    this.birthDay = birthDay;
    this.luggageCount = luggageCount;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getIdCardNumber() {
    return idCardNumber;
  }

  public void setIdCardNumber(String idCardNumber) {
    this.idCardNumber = idCardNumber;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public Date getBirthDay() {
    return birthDay;
  }

  public void setBirthDay(Date birthDay) {
    this.birthDay = birthDay;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public int getLuggageCount() {
    return luggageCount;
  }

  public void setLuggageCount(int luggageCount) {
    this.luggageCount = luggageCount;
  }

  public String getPassportNumber() {
    return passportNumber;
  }

  public void setPassportNumber(String passportNumber) {
    this.passportNumber = passportNumber;
  }
}
