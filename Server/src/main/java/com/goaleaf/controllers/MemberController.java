package com.goaleaf.controllers;

import com.goaleaf.entities.Member;
import com.goaleaf.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/members")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public Iterable<Member> getWholeMembersTable() {
        return memberService.getAll();
    }

}
