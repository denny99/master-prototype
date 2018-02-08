package de.uni.frankfurt.json.responses;

import java.util.List;

public class ListResponse<T> {
  private final List<T> body;
  private final MetaData meta;

  public ListResponse(
      List<T> results, int maxRestults, int offset, int limit) {
    this.body = results;
    this.meta = new MetaData(maxRestults, offset, limit);
  }

  public List<T> getBody() {
    return body;
  }

  public MetaData getMeta() {
    return meta;
  }
}
