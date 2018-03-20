package de.uni.frankfurt.json.responses;

import de.uni.frankfurt.database.entity.Flight;
import de.uni.frankfurt.json.annotations.JsonField;
import de.uni.frankfurt.json.annotations.JsonObject;

import java.util.List;

@JsonObject
public class FlightSearchResponse {
  @JsonField(
      description = "Max number of possible results"
  )
  private Integer maxResults;
  @JsonField(
      description = "Used offset for query"
  )
  private Integer offset;
  @JsonField(
      description = "Used limit for query"
  )
  private Integer limit;
  @JsonField(
      description = "The limited result"
  )
  private List<Flight> data;

  public FlightSearchResponse() {
  }

  public FlightSearchResponse(
      Integer maxResults, Integer offset, Integer limit, List<Flight> data) {
    this.maxResults = maxResults;
    this.offset = offset;
    this.limit = limit;
    this.data = data;
  }

  public Integer getMaxResults() {
    return maxResults;
  }

  public void setMaxResults(Integer maxResults) {
    this.maxResults = maxResults;
  }

  public List<Flight> getData() {
    return data;
  }

  public void setData(List<Flight> data) {
    this.data = data;
  }

  public Integer getOffset() {
    return offset;
  }

  public void setOffset(Integer offset) {
    this.offset = offset;
  }

  public Integer getLimit() {
    return limit;
  }

  public void setLimit(Integer limit) {
    this.limit = limit;
  }
}
