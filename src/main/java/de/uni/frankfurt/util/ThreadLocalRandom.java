package de.uni.frankfurt.util;

import java.util.Random;

public class ThreadLocalRandom {
  private static Random r = new Random();

  public static int nextInt(int start, int end) {
    return r.nextInt(end - start) + start;
  }
}
