package com.goaleaf.controllers;

import com.goaleaf.entities.DTO.CompleteTaskDTO;
import com.goaleaf.entities.DTO.PostDTO;
import com.goaleaf.entities.DTO.TaskDTO;
import com.goaleaf.entities.Post;
import com.goaleaf.entities.viewModels.TaskViewModel;
import com.goaleaf.entities.viewModels.habitsManaging.postsCreating.NewPostViewModel;
import com.goaleaf.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public Iterable<TaskViewModel> getAll() {
        return taskService.getAllTasks();
    }

    @RequestMapping(value = "/habit", method = RequestMethod.GET)
    public Iterable<TaskViewModel> getAllFromHabit(@RequestParam Integer habitID) {
        return taskService.getAllByHabitID(habitID);
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public Iterable<TaskViewModel> getAllFromUser(@RequestParam Integer userID) {
        return taskService.getAllByCreatorID(userID);
    }

    @RequestMapping(value = "/user&habit", method = RequestMethod.GET)
    public Iterable<TaskViewModel> getAllByUserFromHabit(@RequestParam Integer userID, Integer habiID) {
        return taskService.getAllByCreatorIDAndHabitID(userID, habiID);
    }

    @RequestMapping(value = "/task", method = RequestMethod.GET)
    public TaskViewModel getOneByID(@RequestParam Integer taskID) {
        return taskService.getTaskByID(taskID);
    }

    @RequestMapping(value = "/count_usr", method = RequestMethod.GET)
    public Integer countTasksByUser(@RequestParam Integer userID) {
        return taskService.countUserTasks(userID);
    }

    @RequestMapping(value = "/count_hbt", method = RequestMethod.GET)
    public Integer countHabitTasks(@RequestParam Integer habitID) {
        return taskService.countHabitTasks(habitID);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public TaskViewModel addTask(@RequestBody TaskDTO newTaskDTO) {
        return taskService.saveTask(newTaskDTO);
    }

    @RequestMapping(value = "/complete", method = RequestMethod.POST)
    public Post completeTask(@RequestBody CompleteTaskDTO cmp) {
        return taskService.completeTask(cmp);
    }

}
