package com.goaleaf.entities.viewModels.habitsManaging;

public class MemberExistsException extends RuntimeException {
    public MemberExistsException(final String message) {
        super(message);
    }
}
