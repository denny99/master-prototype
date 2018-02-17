package de.uni.frankfurt.test.json.objects;

import de.uni.frankfurt.json.annotations.JsonField;
import de.uni.frankfurt.json.annotations.JsonObject;

import java.util.List;

@JsonObject
public class TestObject {
  @JsonField(
      required = true
  )
  public String required;
  @JsonField(
      minLength = 3
  )
  public String minLength;

  @JsonField(
      maxLength = 3
  )
  public String maxLength;

  @JsonField(
      maximum = 10
  )
  public Integer maximumInt;

  @JsonField(
      maximum = 10.f
  )
  public Float maximumFloat;

  @JsonField(
      dependency = {"dep2"}
  )
  public Integer dep1;
  public Integer dep2;

  @JsonField(
      pattern = "^\\d{5}$"
  )
  public String pattern;

  @JsonField(
      readOnly = true
  )
  public Integer readOnly;

  @JsonField(
      writeOnly = true
  )
  public Float writeOnly;

  @JsonField(
      uniqueItems = true
  )
  public String[] uniqueArray;

  @JsonField(
      uniqueItems = true
  )
  public List<Integer> uniqueList;
}
