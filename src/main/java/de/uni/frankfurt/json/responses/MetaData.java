package de.uni.frankfurt.json.responses;

public class MetaData {
  private final int maxResults;
  private final int nextOffset;
  private final int lastOffset;

  MetaData(int maxResults, int offset, int limit) {
    this.maxResults = maxResults;
    this.nextOffset = offset + limit < maxResults ? offset + limit : offset;
    this.lastOffset = offset - limit > 0 ? offset - limit : 0;
  }

  public int getMaxResults() {
    return maxResults;
  }

  public int getNextOffset() {
    return nextOffset;
  }

  public int getLastOffset() {
    return lastOffset;
  }
}
