package com.goaleaf.services;

import com.goaleaf.entities.Post;

public interface PostService {

    Iterable<Post> getAllHabitPosts(Integer habitID);

    Post findOneByID(Integer id);

    void removePostFromDatabase(Integer id);
}
