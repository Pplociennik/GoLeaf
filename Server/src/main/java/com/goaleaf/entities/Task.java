package com.goaleaf.entities;

import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Table(name = "Tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer creatorID;

    private Integer habitID;

    private String description;

    private Integer points;


    public Task(Integer creatorID, Integer habitID, String description, Integer points) {
        this.creatorID = creatorID;
        this.habitID = habitID;
        this.description = description;
        this.points = points;
    }

    public Integer getId() {
        return id;
    }

    public Integer getCreatorID() {
        return creatorID;
    }

    public void setCreatorID(Integer creatorID) {
        this.creatorID = creatorID;
    }

    public Integer getHabitID() {
        return habitID;
    }

    public void setHabitID(Integer habitID) {
        this.habitID = habitID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
}
