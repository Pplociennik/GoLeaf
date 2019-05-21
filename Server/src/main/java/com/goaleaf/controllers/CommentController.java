package com.goaleaf.controllers;

import com.goaleaf.entities.Comment;
import com.goaleaf.entities.DTO.CommentDTO;
import com.goaleaf.entities.viewModels.habitsManaging.postsManaging.commentsCreating.AddCommentViewModel;
import com.goaleaf.entities.viewModels.habitsManaging.postsManaging.commentsManaging.EditCommentViewModel;
import com.goaleaf.services.CommentService;
import com.goaleaf.validators.exceptions.habitsProcessing.postsProcessing.commentsProcessing.CommentNotFoundException;
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

    @RequestMapping(value = "/getcomments", method = RequestMethod.GET)
    public Iterable<Comment> getAllPostComments(@RequestParam Integer postID) {
        return commentService.listAllByPostID(postID);
    }

    @RequestMapping(value = "/remove", method = RequestMethod.DELETE)
    public void removeCommentByID(@RequestParam Integer id) {
        commentService.removeById(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public void updateComment(@RequestBody EditCommentViewModel model) {

        if (commentService.getOneByID(model.commentID) == null)
            throw new CommentNotFoundException(HttpStatus.NOT_FOUND, "Comment Not Found!");

        Comment comment = commentService.getOneByID(model.commentID);

        comment.setCommentText(model.text);
        commentService.updateComment(comment);
    }
}
