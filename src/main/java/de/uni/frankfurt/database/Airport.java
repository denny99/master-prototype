package de.uni.frankfurt.database;

public class Airport {
  private String code;
  private String name;
  private String country;
  private String city;

  public Airport() {
  }

  public Airport(String code, String name, String country, String city) {
    this.code = code;
    this.name = name;
    this.country = country;
    this.city = city;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public boolean matchesCountry(String country) {
    return country.isEmpty() || this.country.equals(country);
  }

  public boolean matchesCity(String city) {
    return city.isEmpty() || this.city.equals(city);
  }
}
