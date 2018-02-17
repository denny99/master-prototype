package de.uni.frankfurt.exceptions.adapter;

import de.uni.frankfurt.exceptions.ResourceNotFoundException;

/**
 * required: only works when class is present in extends of implements
 */
public class ResourceNotFoundExceptionAdapter extends RestExceptionAdapter<ResourceNotFoundException> {
}
