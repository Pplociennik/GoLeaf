package com.goaleaf.services.servicesImpl;

import com.goaleaf.entities.Comment;
import com.goaleaf.repositories.CommentRepository;
import com.goaleaf.services.CommentService;

public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;

    @Override
    public Iterable<Comment> listAllByPostID(Integer postID) {
        return commentRepository.getAllByPostID(postID);
    }

    @Override
    public Comment getOneByID(Integer commentID) {
        return commentRepository.findById(commentID);
    }

    @Override
    public void addNewComment(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public void removeById(Integer id) {
        commentRepository.delete(id);
    }

    @Override
    public void updateComment(Comment comment) {
        commentRepository.save(comment);
    }
}
