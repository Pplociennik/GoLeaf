package com.goaleaf.entities.DTO;

import com.goaleaf.entities.enums.PostTypes;

import java.util.Date;

public class PostDTO {

    public Integer id;

    public String creator;

    public String text;

    public PostTypes type;

    public Date dateOfAddition;
}
