package de.uni.frankfurt.util;

import java.sql.Timestamp;
import java.util.Date;

public class RandomDateGenerator {
    private long start = Timestamp.valueOf("2019-01-01 00:00:00").getTime();
    private long end = Timestamp.valueOf("2019-12-31 00:00:00").getTime();

    /**
     * generate random date
     *
     * @return new date
     */
    public Date getDate() {
        long diff = start - end + 1;
        return new Date(start + (long) (Math.random() * diff));
    }
}
