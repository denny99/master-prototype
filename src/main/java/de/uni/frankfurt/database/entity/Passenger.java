package de.uni.frankfurt.database.entity;


import de.uni.frankfurt.util.ThreadLocalRandom;

import java.util.Date;

public class Passenger {
  private String id;
  private String name;
  private String idCardNumber;
  private String passportNumber;
  private Date birthDay;

  public Passenger() {
  }

  public Passenger(String name, String idCardNumber) {
    this.id = String.valueOf(
        ThreadLocalRandom.nextInt(0, 100000000 + 1));
    this.name = name;
    this.idCardNumber = idCardNumber;
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

  public Date getBirthDay() {
    return birthDay;
  }

  public void setBirthDay(Date birthDay) {
    this.birthDay = birthDay;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPassportNumber() {
    return passportNumber;
  }

  public void setPassportNumber(String passportNumber) {
    this.passportNumber = passportNumber;
  }
}
