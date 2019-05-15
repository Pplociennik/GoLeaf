package com.goaleaf.repositories;

import com.goaleaf.entities.Comment;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Integer> {

    Iterable<Comment> getAllByPostID(Integer postID);

    Comment findById(Integer commentID);
}
