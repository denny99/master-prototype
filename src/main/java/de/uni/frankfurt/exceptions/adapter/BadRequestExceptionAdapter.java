package de.uni.frankfurt.exceptions.adapter;

import de.uni.frankfurt.exceptions.BadRequestException;

/**
 * required: only works when class is present in extends of implements
 */
public class BadRequestExceptionAdapter extends RestExceptionAdapter<BadRequestException> {
}
