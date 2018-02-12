package de.uni.frankfurt.test.webservice;

import de.uni.frankfurt.json.wrapper.APIResponse;
import de.uni.frankfurt.json.wrapper.JSONParser;
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

abstract class WSTest {
  @ArquillianResource
  protected URL deploymentUrl;
  protected JSONParser parser;
  protected WebTarget webTarget;

  abstract protected String getResourceURL();

  @Deployment
  public static WebArchive createDeployment() {
    return ShrinkWrap.create(WebArchive.class)
        .addPackages(true, "de.uni.frankfurt")
        .addAsWebInfResource(EmptyAsset.INSTANCE,
            ArchivePaths.create("beans.xml"));
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
      String basePath, Type type) {
    return new APIResponse<T>(webTarget
        .path(basePath)
        .request(MediaType.APPLICATION_JSON)
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
    // TODO handle error messages
    return new APIResponse<>(webTarget
        .path(basePath)
        .request(MediaType.APPLICATION_JSON)
        .post(Entity.json(b)), clazz);

  }

  @Before
  public void setup() throws MalformedURLException {
    this.parser = new JSONParser();
    Client client = ClientBuilder.newClient();
    this.webTarget = client.target(
        URI.create(new URL(this.deploymentUrl, "api").toExternalForm()));
  }
}
