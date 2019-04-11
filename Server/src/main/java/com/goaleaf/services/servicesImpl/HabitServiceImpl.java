package com.goaleaf.services.servicesImpl;

import com.goaleaf.entities.Habit;
import com.goaleaf.entities.Member;
import com.goaleaf.entities.viewModels.habitsCreating.HabitViewModel;
import com.goaleaf.repositories.HabitRepository;
import com.goaleaf.services.HabitService;
import com.goaleaf.validators.exceptions.habitsCreating.WrongTitleException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Set;

@Service
public class HabitServiceImpl implements HabitService {

    @Autowired
    private HabitRepository habitRepository;
    @Autowired
    private HabitService habitService;


    @Override
    public Iterable<Habit> listAllHabits() {
        return habitRepository.findAll();
    }

    @Override
    public ArrayList<Habit> listAllUsersHabits(Integer userID) {
        Iterable<Habit> allHabits;
        ArrayList<Habit> resultHabits = new ArrayList<>();
        Set<Member> tempMembers;

        allHabits = habitRepository.findAll();

        for (Habit habit : allHabits) {
            tempMembers = habit.getMembers();
            for (Member member : tempMembers) {
                if (member.getId().equals(userID))
                    resultHabits.add(habit);
            }
        }
        return resultHabits;
    }

    @Override
    public Habit getHabitById(Integer id) {
        return habitRepository.findById(id);
    }

    @Override
    public Habit saveHabit(Habit habit) {
        return habitRepository.save(habit);
    }

    @Override
    public void removeHabit(Integer id) {
        habitRepository.delete(id);
    }

    @Override
    public Boolean checkIfExists(Integer id) {
        return (habitRepository.checkIfExists(id) > 0);
    }

    @Override
    public Iterable<Habit> listAllHabitsPaging(Integer pageNr, Integer howManyOnPage) {
        return habitRepository.findAll(new PageRequest(pageNr, howManyOnPage));
    }

    @Override
    public Habit registerNewHabit(HabitViewModel model) throws WrongTitleException {

        Habit newHabit = new Habit();

        newHabit.setHabitStartDate(model.startDate == null ? new Date() : model.startDate);
        newHabit.setFrequency(model.frequency);
        newHabit.setHabitTitle(model.title);
        newHabit.setCategory(model.category);
        newHabit.setMembers(model.members);
        newHabit.setPrivate(model.isPrivate);

        return habitRepository.save(newHabit);
    }

    @Override
    public Habit findByTitle(String title) {
        return null;
    }

    @Override
    public Habit findById(Integer id) {
        return null;
    }

    @Override
    public Habit findByOwnerName(String ownerName) {
        return null;
    }
}
