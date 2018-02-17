package de.uni.frankfurt.test.json;

import de.uni.frankfurt.beans.JSONParserBean;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;
import de.uni.frankfurt.test.json.objects.TestObject;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

public class ParserTests {
  private JSONParserBean jsonParserBean;
  private TestObject testObject;

  @Before
  public void setup() {
    this.jsonParserBean = new JSONParserBean();
    this.testObject = new TestObject();
    testObject.required = "some value";
  }

  @Test
  public void testDependency() throws JsonSchemaException {
    // dependency 1 set, but dep2 not
    testObject.dep1 = 1234;
    String json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
      Assert.fail("validation is incorrect");
    } catch (JsonSchemaException e) {
      Assert.assertEquals("too short", e.getReason(),
          "dependency is not fulfilled for dep2");
    }

    // dep2 set, dep1 not (ok!)
    testObject.dep1 = null;
    testObject.dep2 = 12434;
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
    } catch (JsonSchemaException e) {
      Assert.fail("validation is incorrect");
    }

    // ok
    testObject.dep1 = 1234;
    testObject.dep2 = 12434;
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
    } catch (JsonSchemaException e) {
      Assert.fail("validation is incorrect");
    }
  }

  @Test
  public void testMaxLength() throws JsonSchemaException {
    testObject.maxLength = "1234";
    String json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
      Assert.fail("validation is incorrect");
    } catch (JsonSchemaException e) {
      Assert.assertEquals("too short", e.getReason(),
          "is too long, max 3 characters allowed");
    }

    // empty string
    testObject.maxLength = "123";
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
    } catch (JsonSchemaException e) {
      Assert.fail("validation is incorrect");
    }
  }

  @Test
  public void testMaximum() throws JsonSchemaException {
    testObject.maximumInt = 100;
    String json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
      Assert.fail("validation is incorrect");
    } catch (JsonSchemaException e) {
      Assert.assertEquals("integer too big", e.getReason(),
          "is too big, max 10,000000 allowed");
    }

    testObject.maximumInt = 10;
    testObject.maximumFloat = 100.f;
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
      Assert.fail("validation is incorrect");
    } catch (JsonSchemaException e) {
      Assert.assertEquals("float too big", e.getReason(),
          "is too big, max 10,000000 allowed");
    }

    // empty string
    testObject.maximumInt = 10;
    testObject.maximumFloat = 10.f;
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
    } catch (JsonSchemaException e) {
      Assert.fail("validation is incorrect");
    }
  }

  @Test
  public void testMinLength() throws JsonSchemaException {
    testObject.minLength = "12";
    String json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
      Assert.fail("validation is incorrect");
    } catch (JsonSchemaException e) {
      Assert.assertEquals("too short", e.getReason(),
          "is too short, min 3 characters required");
    }

    // empty string
    testObject.minLength = "123";
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
    } catch (JsonSchemaException e) {
      Assert.fail("validation is incorrect");
    }
  }

  @Test
  public void testPattern() throws JsonSchemaException {
    // pattern not ok
    testObject.pattern = "123t4";
    String json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
      Assert.fail("validation is incorrect");
    } catch (JsonSchemaException e) {
      Assert.assertEquals("too short", e.getReason(),
          "doesn't match the pattern ^\\d{5}$");
    }

    // empty string
    testObject.pattern = "12345";
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
    } catch (JsonSchemaException e) {
      Assert.fail("validation is incorrect");
    }
  }

  @Test
  public void testReadOnly() throws JsonSchemaException {
    testObject.readOnly = 123456;
    String json = jsonParserBean.toJSON(testObject, true);
    try {
      TestObject testObject = jsonParserBean.fromJSON(json, TestObject.class);
      Assert.assertEquals("read only value is null", testObject.readOnly, null);
    } catch (JsonSchemaException e) {
      Assert.fail("validation is incorrect");
    }
  }

  @Test
  public void testRequired() throws JsonSchemaException {
    // required field is null
    testObject.required = null;
    String json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
      Assert.fail("validation is incorrect");
    } catch (JsonSchemaException e) {
      Assert.assertEquals("required value is null", e.getReason(),
          "is required");
    }

    // empty string
    testObject.required = "";
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
      Assert.fail("validation is incorrect");
    } catch (JsonSchemaException e) {
      Assert.assertEquals("required value is empty", e.getReason(),
          "is required");
    }

    // correct
    testObject.required = "some value";
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
    } catch (JsonSchemaException e) {
      Assert.fail("validation is incorrect");
    }
  }

  @Test
  public void testUniqueItems() throws JsonSchemaException {
    // duplicated entry in array
    testObject.uniqueArray = new String[]{"1", "2", "3", "1"};
    String json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
      Assert.fail("validation is incorrect");
    } catch (JsonSchemaException e) {
      Assert.assertEquals("too short", e.getReason(),
          "does not allow duplicate values (1)");
    }

    // ok
    testObject.uniqueArray = new String[]{"1", "2", "3"};
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
    } catch (JsonSchemaException e) {
      Assert.fail("validation is incorrect");
    }

    // duplicated entry in list
    testObject.uniqueList = Arrays.asList(1, 2, 3, 1);
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
      Assert.fail("validation is incorrect");
    } catch (JsonSchemaException e) {
      Assert.assertEquals("too short", e.getReason(),
          "does not allow duplicate values (1)");
    }

    // ok
    testObject.uniqueList = Arrays.asList(1, 2, 3);
    json = jsonParserBean.toJSON(testObject, true);
    try {
      jsonParserBean.fromJSON(json, TestObject.class);
    } catch (JsonSchemaException e) {
      Assert.fail("validation is incorrect");
    }
  }

  @Test
  public void testWriteOnly() throws JsonSchemaException {
    testObject.writeOnly = 23.f;
    String json = jsonParserBean.toJSON(testObject);
    // field should be empty now (reading)
    try {
      TestObject testObject = jsonParserBean.fromJSON(json, TestObject.class);
      Assert.assertEquals("write only value is null", testObject.writeOnly,
          null);
    } catch (JsonSchemaException e) {
      Assert.fail("validation is incorrect");
    }
  }

}
