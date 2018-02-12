package de.uni.frankfurt.database.entity;


import de.uni.frankfurt.util.ThreadLocalRandom;

import java.util.Date;

public class Passenger {
  private String id;
  private String firstName;
  private String lastName;
  private String idCardNumber;
  private String passportNumber;
  private Date birthDay;
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
