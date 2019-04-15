package com.goaleaf.services;

import com.goaleaf.entities.Habit;
import com.goaleaf.entities.Member;
import org.springframework.stereotype.Service;

@Service
public interface MemberService {

    Member getByUserID(Integer id);

    Member saveMember(Member member);

    Boolean checkIfExist(Member member);

    Iterable<Member> getAllByHabitID(Integer habitID);

    Iterable<Member> getAll();

    Integer countAllHabitMembers(Integer habitID);
}
