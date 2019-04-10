package com.goaleaf.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "done_dates")
public class Dates {

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
}
