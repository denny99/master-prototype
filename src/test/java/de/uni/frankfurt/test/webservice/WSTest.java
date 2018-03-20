package de.uni.frankfurt.test.webservice;

import de.uni.frankfurt.beans.JSONParserBean;
import de.uni.frankfurt.json.exceptions.JsonSchemaException;
import de.uni.frankfurt.test.json.responses.APIResponse;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.jboss.shrinkwrap.api.ArchivePaths;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Before;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

abstract class WSTest {
  @ArquillianResource
  protected URL deploymentUrl;
  protected JSONParserBean parser;
  protected WebTarget webTarget;

  abstract protected String getResourceURL();

  @Deployment
  public static WebArchive createDeployment() {
    return ShrinkWrap.create(WebArchive.class)
        .addPackages(true, "de.uni.frankfurt")
        .addAsWebInfResource(EmptyAsset.INSTANCE,
            ArchivePaths.create("beans.xml"))
        .addAsWebInfResource(EmptyAsset.INSTANCE,
            ArchivePaths.create("faces-config.xml"));
  }

  /**
   * retrieve data from api
   *
   * @param basePath rest url
   * @return object from api
   */
  protected <T> APIResponse<T> getResourceFromAPI(
      String basePath, Class<T> clazz) {
    return new APIResponse<>(webTarget
        .path(basePath)
        .request(MediaType.APPLICATION_JSON)
        .get(), clazz);
  }

  /**
   * retrieve list data from api
   *
   * @param basePath rest url
   * @return object from api
   */
  protected <T> APIResponse<T> getResourcesFromAPI(
      String basePath, Type type) throws JsonSchemaException {
    return new APIResponse<>(webTarget
        .path(basePath)
        .request(MediaType.APPLICATION_JSON)
        .get(), type);
  }

  /**
   * retrieve list data from api with query
   *
   * @param basePath rest url
   * @return object from api
   */
  protected <T> APIResponse<T> getResourcesFromAPI(
      String basePath, HashMap<String, String> query,
      Type type) throws JsonSchemaException {
    WebTarget target = webTarget
        .path(basePath);

    for (Map.Entry<String, String> entry : query.entrySet()) {
      target = target.queryParam(entry.getKey(), entry.getValue());
    }

    return new APIResponse<>(target.request(MediaType.APPLICATION_JSON)
        .get(), type);
  }

  /**
   * post single resource to api
   *
   * @param basePath rest api
   * @param b        object to post
   * @param clazz    clazz of response object
   * @return created object on api
   */
  protected <T> APIResponse<T> postResourceToAPI(
      String basePath, Object b, Class<T> clazz) {
    return new APIResponse<>(webTarget
        .path(basePath)
        .request(MediaType.APPLICATION_JSON)
        .post(Entity.json(b)), clazz);

  }

  @Before
  public void setup() throws MalformedURLException {
    this.parser = new JSONParserBean();
    Client client = ClientBuilder.newClient();
    this.webTarget = client.target(
        URI.create(new URL(this.deploymentUrl, "api").toExternalForm()));
  }
}
