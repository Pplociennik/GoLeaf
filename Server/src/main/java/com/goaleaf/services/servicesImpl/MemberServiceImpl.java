package com.goaleaf.services.servicesImpl;

import com.goaleaf.entities.Habit;
import com.goaleaf.entities.Member;
import com.goaleaf.repositories.HabitRepository;
import com.goaleaf.repositories.MemberRepository;
import com.goaleaf.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private HabitRepository habitRepository;

    @Override
    public Member getByUserID(Integer id) {
        return memberRepository.findByUserID(id);
    }

    @Override
    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    public Boolean checkIfExist(Member member) {
        return memberRepository.existsByHabitIDAndAndUserID(member.getHabitID(), member.getUserID());
    }

    @Override
    public Iterable<Member> getAllByHabitID(Integer habitID) {
        return memberRepository.findAllByHabitID(habitID);
    }

    @Override
    public Iterable<Member> getAll() {
        return memberRepository.findAll();
    }

    @Override
    public Integer countAllHabitMembers(Integer habitID) {
        return memberRepository.countAllByHabitID(habitID);
    }

    public void removeSpecifiedMember(Integer habitID, Integer userID) {
        memberRepository.deleteByHabitIDAndUserID(habitID, userID);
    }

    public Member findSpecifiedMember(Integer habitID, Integer userID) {
        return memberRepository.findByHabitIDAndUserID(habitID, userID);
    }

    public Map<Integer, Member> getRank(Integer habitID) {
        Iterable<Member> data = memberRepository.getAllByHabitIDOrderByPointsDesc(habitID);
        Map<Integer, Member> resultMap = new LinkedHashMap<>();
        Integer i = 1;

        for (Member m : data) {
            resultMap.put(i, m);
            i++;
        }

        return resultMap;
    }


}
