package de.uni.frankfurt.beans;


import de.uni.frankfurt.adapter.BadRequestExceptionAdapter;
import de.uni.frankfurt.adapter.ConditionFailedExceptionAdapter;
import de.uni.frankfurt.adapter.ResourceNotFoundExceptionAdapter;
import de.uni.frankfurt.json.parser.JSONParser;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;

@Named
@ApplicationScoped
public class JSONParserBean extends JSONParser {
  public JSONParserBean() {
    this.withAdapters(new BadRequestExceptionAdapter(),
        new ConditionFailedExceptionAdapter(),
        new ResourceNotFoundExceptionAdapter()).build();
  }
}
