package com.goaleaf.validators;

public class HabitNameValidator {

    public boolean isValid(String title) {
        return (title.length() < 250 && title.length() > 15);
    }
}
