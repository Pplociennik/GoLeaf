package com.goaleaf.entities;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.goaleaf.entities.enums.PostTypes;

import javax.persistence.*;

@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,
        property = "refId", scope = Post.class)
@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column
    private Integer habitID;

    @Column
    private String creatorLogin;

    @Column
    private PostTypes postType;

    @Column
    private String postText;

    @Column
    private String imgName;

    @Column
    private Integer counter_CLAPPING;

    @Column
    private Integer counter_WOW;

    @Column
    private Integer counter_NS;

    @Column
    private Integer counter_TTD;


    public Post() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getHabitID() {
        return habitID;
    }

    public void setHabitID(Integer habitID) {
        this.habitID = habitID;
    }

    public String getCreatorLogin() {
        return creatorLogin;
    }

    public void setCreatorLogin(String creatorLogin) {
        this.creatorLogin = creatorLogin;
    }

    public PostTypes getPostType() {
        return postType;
    }

    public void setPostType(PostTypes postType) {
        this.postType = postType;
    }

    public Integer getCounter_CLAPPING() {
        return counter_CLAPPING;
    }

    public void setCounter_CLAPPING(Integer counter_CLAPPING) {
        this.counter_CLAPPING = counter_CLAPPING;
    }

    public Integer getCounter_WOW() {
        return counter_WOW;
    }

    public void setCounter_WOW(Integer counter_WOW) {
        this.counter_WOW = counter_WOW;
    }

    public Integer getCounter_NS() {
        return counter_NS;
    }

    public void setCounter_NS(Integer counter_NS) {
        this.counter_NS = counter_NS;
    }

    public Integer getCounter_TTD() {
        return counter_TTD;
    }

    public void setCounter_TTD(Integer counter_TTD) {
        this.counter_TTD = counter_TTD;
    }

    public String getImgName() {
        return imgName;
    }

    public void setImgName(String imgName) {
        this.imgName = imgName;
    }

    public String getPostText() {
        return postText;
    }

    public void setPostText(String postText) {
        this.postText = postText;
    }
}
