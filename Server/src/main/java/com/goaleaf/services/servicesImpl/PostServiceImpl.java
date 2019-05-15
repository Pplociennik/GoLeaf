package com.goaleaf.services.servicesImpl;

import com.goaleaf.entities.Post;
import com.goaleaf.repositories.PostRepository;
import com.goaleaf.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;

public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Iterable<Post> getAllHabitPosts(Integer habitID) {
        return postRepository.getAllByHabitID(habitID);
    }

    @Override
    public Post findOneByID(Integer id) {
        return postRepository.findById(id);
    }

    @Override
    public void removePostFromDatabase(Integer id) {
        postRepository.delete(id);
    }
}
