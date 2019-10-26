package com.goaleaf.entities.viewModels;

public class TaskViewModel {

    private Integer id;

    private String creator;

    private String description;

    private Integer points;

    public TaskViewModel(Integer id, String creator, String description, Integer points) {
        this.id = id;
        this.creator = creator;
        this.description = description;
        this.points = points;
    }

    public Integer getId() {
        return id;
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
