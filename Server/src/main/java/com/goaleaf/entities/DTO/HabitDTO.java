package com.goaleaf.entities.DTO;

import com.goaleaf.entities.Member;
import com.goaleaf.entities.enums.Category;
import com.goaleaf.entities.enums.Frequency;
import com.goaleaf.entities.enums.Status;

import java.util.Date;
import java.util.Set;

public class HabitDTO {

    public String title;

    public Category category;

    public Boolean isPrivate;

    public Set<Member> members;

    public Frequency frequency;

    public Date startDate;
}
