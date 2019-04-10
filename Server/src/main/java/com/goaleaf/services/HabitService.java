package com.goaleaf.services;

import com.goaleaf.entities.Habit;
import com.goaleaf.entities.viewModels.habitsCreating.HabitViewModel;
import com.goaleaf.validators.exceptions.habitsCreating.WrongTitleException;
import org.springframework.stereotype.Service;

@Service
public interface HabitService {

    Iterable<Habit> listAllHabits();

    Iterable<Habit> listAllUsersHabits(Integer userID);

    Habit getHabitById(Integer id);

    Habit saveHabit(Habit habit);

    void removeHabit(Integer id);

    Boolean checkIfExists(Integer id);

    Iterable<Habit> listAllHabitsPaging(Integer pageNr, Integer howManyOnPage);

    Habit registerNewHabit(HabitViewModel model) throws WrongTitleException;

    Habit findByTitle(String title);

    Habit findById(Integer id);

    Habit findByOwnerName(String ownerName);
}
