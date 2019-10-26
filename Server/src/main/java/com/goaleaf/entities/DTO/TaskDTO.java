package com.goaleaf.entities.DTO;

public class TaskDTO {

    private String token;

    private Integer habitID;

    private String description;

    private Integer points;

    public TaskDTO() {
    }

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
