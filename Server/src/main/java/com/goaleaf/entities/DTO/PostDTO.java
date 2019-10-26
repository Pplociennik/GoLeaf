package com.goaleaf.entities.DTO;

import com.goaleaf.entities.enums.PostTypes;

import java.util.Date;

public class PostDTO {

    private Integer id;

    private String creator;

    private String text;

    private PostTypes type;

    private Date dateOfAddition;

    public PostDTO() {
    }

    public PostDTO(String creator, String text, PostTypes type, Date dateOfAddition) {
        this.creator = creator;
        this.text = text;
        this.type = type;
        this.dateOfAddition = dateOfAddition;
    }
}
