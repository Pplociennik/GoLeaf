package com.goaleaf.controllers;

import com.goaleaf.entities.Comment;
import com.goaleaf.entities.DTO.CommentDTO;
import com.goaleaf.entities.viewModels.habitsManaging.commentsCreating.AddCommentViewModel;
import com.goaleaf.services.CommentService;
import com.goaleaf.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @RequestMapping(value = "/addcomment", method = RequestMethod.POST)
    public CommentDTO addComment(@RequestBody AddCommentViewModel model) {

        Comment comment = new Comment();
        comment.setCommentText(model.text);
        comment.setPostID(model.postID);
        comment.setUserID(model.creatorID);

        commentService.addNewComment(comment);

        CommentDTO commentDTO = new CommentDTO();
        commentDTO.creatorID = model.creatorID;
        commentDTO.postID = model.postID;
        commentDTO.text = model.text;

        return commentDTO;
    }

    @RequestMapping(value = "/getcomments/{id}", method = RequestMethod.GET)
    public Iterable<Comment> getAllPostComments(@RequestParam Integer postID) {
        return commentService.listAllByPostID(postID);
    }
}
