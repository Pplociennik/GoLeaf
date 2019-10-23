package com.goaleaf.entities.viewModels;

public class TaskViewModel {

    private String creator;

    private String description;

    private Integer points;

    public TaskViewModel(String creator, String description, Integer points) {
        this.creator = creator;
        this.description = description;
        this.points = points;
    }

    public String getCreator() {
        return creator;
    }

    public String getDescription() {
        return description;
    }

    public Integer getPoints() {
        return points;
    }
}
