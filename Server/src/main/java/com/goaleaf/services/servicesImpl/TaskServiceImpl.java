package com.goaleaf.services.servicesImpl;

import com.goaleaf.entities.DTO.CompleteTaskDTO;
import com.goaleaf.entities.DTO.PostDTO;
import com.goaleaf.entities.DTO.TaskDTO;
import com.goaleaf.entities.Member;
import com.goaleaf.entities.Post;
import com.goaleaf.entities.Task;
import com.goaleaf.entities.User;
import com.goaleaf.entities.enums.PostTypes;
import com.goaleaf.entities.viewModels.TaskViewModel;
import com.goaleaf.repositories.*;
import com.goaleaf.services.TaskService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.goaleaf.security.SecurityConstants.SECRET;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HabitRepository habitRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PostRepository postRepository;


    @Override
    public Iterable<TaskViewModel> getAllTasks() {
        return convertToViewModel(taskRepository.findAll());
    }

    @Override
    public Iterable<TaskViewModel> getAllByCreatorID(Integer creatorID) {
        if (taskRepository.getAllByCreatorID(creatorID) == null) {
            try {
                throw new NotFoundException("The user have created no task");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        return convertToViewModel(taskRepository.getAllByCreatorID(creatorID));
    }

    @Override
    public Iterable<TaskViewModel> getAllByHabitID(Integer habitID) {
        if (taskRepository.getAllByHabitID(habitID) == null) {
            try {
                throw new NotFoundException("No such tasks!");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        return convertToViewModel(taskRepository.getAllByHabitID(habitID));
    }

    @Override
    public Iterable<TaskViewModel> getAllByCreatorIDAndHabitID(Integer creatorID, Integer habitID) {
        if (taskRepository.getAllByCreatorIDAndHabitID(creatorID, habitID) == null) {
            try {
                throw new NotFoundException("No such tasks!");
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        return convertToViewModel(taskRepository.getAllByCreatorIDAndHabitID(creatorID, habitID));
    }

    @Override
    public Integer countUserTasks(Integer userID) {
        return taskRepository.countAllByCreatorID(userID);
    }

    @Override
    public Integer countHabitTasks(Integer habitID) {
        return taskRepository.countAllByHabitID(habitID);
    }

    @Override
    public TaskViewModel saveTask(TaskDTO newTask) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(newTask.getToken()).getBody();

        Task newT = new Task(Integer.parseInt(claims.getSubject()), newTask.getHabitID(), newTask.getDescription(), newTask.getPoints(), false);

        Task returned = taskRepository.save(newT);

        return convertToViewModel(returned);

    }

    @Override
    public PostDTO completeTask(CompleteTaskDTO cmp) {

        Claims claims = Jwts.parser()
                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(cmp.getToken()).getBody();

        User user = userRepository.findById(Integer.parseInt(claims.getSubject()));
        Task task = taskRepository.getById(cmp.getTaskID());
        Member member = memberRepository.findByHabitIDAndUserID(cmp.getHabitID(), user.getId());

        member.addPoints(task.getPoints());
        memberRepository.save(member);

        task.setCompleted(true);
        taskRepository.save(task);

        Post newPost = new Post();
        newPost.setPostType(PostTypes.Task);
        newPost.setCreatorLogin(user.getLogin());
        newPost.setDateOfAddition(new Date());
        newPost.setHabitID(cmp.getHabitID());
        newPost.setPostText("User " + user.getLogin() + " completed task: " + task.getDescription() + "!");
        Post aS = postRepository.save(newPost);

        PostDTO dto = new PostDTO(aS.getCreatorLogin(), aS.getPostText(), aS.getPostType(), aS.getDateOfAddition());
        return dto;
    }

    @Override
    public TaskViewModel getTaskByID(Integer taskID) {
        return convertToViewModel(taskRepository.getById(taskID));
    }

    Iterable<TaskViewModel> convertToViewModel(Iterable<Task> input) {
        List resultList = new ArrayList<TaskViewModel>(0);
        for (Task t : input) {
            User u = userRepository.findById(t.getCreatorID());
            TaskViewModel model = new TaskViewModel(t.getId(), u.getLogin(), t.getDescription(), t.getPoints());
            resultList.add(model);
        }
        Iterable<TaskViewModel> outputList = resultList;
        return outputList;
    }

    TaskViewModel convertToViewModel(Task task) {
        User u = userRepository.findById(task.getCreatorID());
        return new TaskViewModel(task.getId(), u.getLogin(), task.getDescription(), task.getPoints());
    }
}
