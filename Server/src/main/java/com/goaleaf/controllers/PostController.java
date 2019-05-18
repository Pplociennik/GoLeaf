package com.goaleaf.controllers;


import com.auth0.jwt.exceptions.TokenExpiredException;
import com.goaleaf.entities.Post;
import com.goaleaf.entities.User;
import com.goaleaf.entities.enums.PostTypes;
import com.goaleaf.entities.viewModels.habitsManaging.postsCreating.NewPostViewModel;
import com.goaleaf.entities.viewModels.habitsManaging.postsManaging.EditPostViewModel;
import com.goaleaf.entities.viewModels.habitsManaging.postsManaging.RemovePostViewModel;
import com.goaleaf.services.*;
import com.goaleaf.validators.exceptions.habitsProcessing.MemberDoesNotExistException;
import com.goaleaf.validators.exceptions.habitsProcessing.postsProcessing.UserIsNotCreatorException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

import static com.goaleaf.security.SecurityConstants.SECRET;


@RestController
@RequestMapping(value = "/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private PostService postService;
    @Autowired
    private MemberService memberService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public Iterable<Post> getAllHabitPosts(@RequestParam String token, Integer habitID) {

        Claims claims = Jwts.parser()
                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(token).getBody();

        if (!jwtService.Validate(token, SECRET))
            throw new TokenExpiredException("You have to be logged in!");
        if (memberService.findSpecifiedMember(habitID, Integer.parseInt(claims.getSubject())) == null)
            throw new MemberDoesNotExistException("You are not a member!");

        return postService.getAllHabitPosts(habitID);
    }

    @RequestMapping(value = "/addpost", method = RequestMethod.POST)
    public HttpStatus addNewPost(@RequestBody NewPostViewModel model) {

        Claims claims = Jwts.parser()
                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(model.token).getBody();

        User tempUser = userService.findById(Integer.parseInt(claims.getSubject()));

        if (!jwtService.Validate(model.token, SECRET))
            throw new TokenExpiredException("You have to be logged in!");
        if (memberService.findSpecifiedMember(model.habitID, Integer.parseInt(claims.getSubject())) == null)
            throw new MemberDoesNotExistException("You are not a member!");

        Post newPost = new Post();
        newPost.setHabitID(model.habitID);
        if (model.type == PostTypes.JustText)
            newPost.setPostType(PostTypes.JustText);
        if (model.type == PostTypes.JustPhoto)
            newPost.setPostType(PostTypes.JustPhoto);
        if (model.type == PostTypes.TextAndPhoto)
            newPost.setPostType(PostTypes.TextAndPhoto);
        newPost.setCreatorLogin(tempUser.getLogin());
        newPost.setPostText(model.postText);

        postService.save(newPost);

        return HttpStatus.OK;

    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public HttpStatus removePostFromDatabase(@RequestBody RemovePostViewModel model) {

        Claims claims = Jwts.parser()
                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(model.token).getBody();

        User tempUser = userService.findById(Integer.parseInt(claims.getSubject()));

        if (!jwtService.Validate(model.token, SECRET))
            throw new TokenExpiredException("You have to be logged in!");
        if (memberService.findSpecifiedMember(model.habitID, Integer.parseInt(claims.getSubject())) == null)
            throw new MemberDoesNotExistException("You are not a member!");
        if (postService.findOneByID(model.postID).getCreatorLogin() != tempUser.getLogin())
            throw new UserIsNotCreatorException("You cannot delete posts which were not posted by you");

        postService.removePostFromDatabase(model.postID);
        return HttpStatus.OK;

    }

    @RequestMapping(value = "/post/{id}", method = RequestMethod.PUT)
    public HttpStatus editPost(@RequestBody EditPostViewModel model) {

        Claims claims = Jwts.parser()
                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(model.token).getBody();

        User tempUser = userService.findById(Integer.parseInt(claims.getSubject()));

        if (!jwtService.Validate(model.token, SECRET))
            throw new TokenExpiredException("You have to be logged in!");
        if (memberService.findSpecifiedMember(model.habitID, Integer.parseInt(claims.getSubject())) == null)
            throw new MemberDoesNotExistException("You are not a member!");
        if (postService.findOneByID(model.postID).getCreatorLogin() != tempUser.getLogin())
            throw new UserIsNotCreatorException("You cannot edit posts which were not posted by you");

        Post post = postService.findOneByID(model.postID);
        if (model.type == PostTypes.JustText)
            post.setPostType(PostTypes.JustText);
        if (model.type == PostTypes.JustPhoto)
            post.setPostType(PostTypes.JustPhoto);
        if (model.type == PostTypes.TextAndPhoto)
            post.setPostType(PostTypes.TextAndPhoto);

        post.setPostText(model.text);

        postService.updatePost(post);

        return HttpStatus.OK;
    }


}
