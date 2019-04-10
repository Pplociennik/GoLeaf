package com.goaleaf.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column
    private Integer userID;

    @ManyToMany
    @Column
    private Set<Habit> habits;

    @OneToMany(mappedBy = "members")
    @Column
    private Set<Dates> doneDates;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public Set<Habit> getHabits() {
        return habits;
    }

    public void setHabits(Set<Habit> habits) {
        this.habits = habits;
    }

    public Set<Dates> getDoneDates() {
        return doneDates;
    }

    public void setDoneDates(Set<Dates> doneDates) {
        this.doneDates = doneDates;
    }
}
