package com.goaleaf.entities.DTO;

public class TaskDTO {

    public String token;

    public Integer habitID;

    public String description;

    public Integer points;


    public TaskDTO(String token, Integer habitID, String description, Integer points) {
        this.token = token;
        this.habitID = habitID;
        this.description = description;
        this.points = points;
    }

    public String getToken() {
        return token;
    }

    public Integer getHabitID() {
        return habitID;
    }

    public String getDescription() {
        return description;
    }

    public Integer getPoints() {
        return points;
    }
}
