package com.goaleaf.entities;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.goaleaf.entities.enums.Reactions;

import javax.persistence.*;

@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,
        property = "refId", scope = PostReaction.class)
@Entity
@Table(name = "reactions")
public class PostReaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column
    private Integer postID;

    @Column
    private Integer userID;

    @Column
    private Reactions type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPostID() {
        return postID;
    }

    public void setPostID(Integer postID) {
        this.postID = postID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public Reactions getType() {
        return type;
    }

    public void setType(Reactions type) {
        this.type = type;
    }
}
