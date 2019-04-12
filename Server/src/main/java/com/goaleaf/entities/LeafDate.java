package com.goaleaf.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "done_dates")
public class LeafDate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column
    private Integer userID;

    @Column
    private Integer habitID;

    @Column
    private Date dateValue;

    @Column
    @ManyToMany
    private Set<Member> members;

    public LeafDate(Integer userID, Integer habitID, Date dateValue, Set<Member> members) {
        this.userID = userID;
        this.habitID = habitID;
        this.dateValue = dateValue;
        this.members = members;
    }

    public LeafDate() {
    }
}
