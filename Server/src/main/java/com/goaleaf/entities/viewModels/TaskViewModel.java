package com.goaleaf.entities.viewModels;

import com.goaleaf.entities.enums.Frequency;

import java.util.Date;

public class TaskViewModel {

    private Integer id;

    private String creator;

    private String description;

    private Integer points;

    private Frequency frequency;

    private Integer daysInterval;

    private Date refreshDate;

    private Boolean active;

    private String executor;

    public TaskViewModel(Integer id, String creator, String description, Integer points, Frequency frequency, Date refreshDate, Boolean active, String executor, Integer daysInterval) {
        this.id = id;
        this.creator = creator;
        this.description = description;
        this.points = points;
        this.frequency = frequency;
        this.executor = executor;
        this.daysInterval = daysInterval;
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
