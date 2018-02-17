package de.uni.frankfurt.database.entity;

import de.uni.frankfurt.json.annotations.JsonObject;
import de.uni.frankfurt.json.annotations.JsonSchema;

@JsonObject
public class Airport {
  @JsonSchema(
      required = true,
      maxLength = 3,
      minLength = 3
  )
  private String code;
  @JsonSchema(
      required = true,
      maxLength = 32
  )
  private String name;
  @JsonSchema(
      required = true,
      enumerable = {"DE", "GB", "IT", "FR", "ES"}
  )
  private String country;
  @JsonSchema(
      required = true,
      maxLength = 32
  )
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

  /**
   * @param city name of the city
   * @return true if airport is in city
   */
  public boolean matchesCity(String city) {
    return city == null || city.isEmpty() || this.city.equals(city);
  }

  /**
   * @param country country two letter code
   * @return true if airport is in country
   */
  public boolean matchesCountry(String country) {
    return country.isEmpty() || this.country.equals(country);
  }
}
