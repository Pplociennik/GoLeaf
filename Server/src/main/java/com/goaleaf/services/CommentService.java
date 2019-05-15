package com.goaleaf.services;

import com.goaleaf.entities.Comment;

public interface CommentService {

    Iterable<Comment> listAllByPostID(Integer postID);

    Comment getOneByID(Integer commentID);

    void addNewComment(Comment comment);
}
