package com.goaleaf.repositories;

import com.goaleaf.entities.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Integer> {

    Iterable<Post> getAllByHabitID(Integer habitID);

    Post findById(Integer id);
}
