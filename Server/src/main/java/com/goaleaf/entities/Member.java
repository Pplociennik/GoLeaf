package com.goaleaf.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    private Set<LeafDate> doneDates;

    public Member(Integer userID, Set<Habit> habits, Set<LeafDate> doneDates) {
        this.userID = userID;
        this.habits = habits;
        this.doneDates = doneDates;
    }

    public Member() {
    }

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

    public Set<LeafDate> getDoneDates() {
        return doneDates;
    }

    public void setDoneDates(Set<LeafDate> doneDates) {
        this.doneDates = doneDates;
    }
}
