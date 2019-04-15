package com.goaleaf.repositories;

import com.goaleaf.entities.Habit;
import com.goaleaf.entities.Member;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Integer> {

    Member findByUserID(Integer id);

    Iterable<Member> findAllByHabitID(Integer habitID);

    Iterable<Habit> findAllByUserID(Integer userID);

    Boolean existsByHabitIDAndAndUserID(Integer habitID, Integer userID);

    Integer countAllByHabitID(Integer habitID);
}
