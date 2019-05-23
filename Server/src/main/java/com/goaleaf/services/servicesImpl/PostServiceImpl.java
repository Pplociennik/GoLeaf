package com.goaleaf.services.servicesImpl;

import com.goaleaf.entities.Post;
import com.goaleaf.entities.enums.PostTypes;
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

    @Override
    public void updatePost(Post post) {
        postRepository.save(post);
    }

    @Override
    public void save(Post post) {
        postRepository.save(post);
    }

    @Override
    public void updatePostImage(Integer postID, String imgName) {
        Post post = postRepository.findById(postID);
        post.setImgName(imgName);
        if (post.getPostText().isEmpty())
            post.setPostType(PostTypes.JustPhoto);
        else
            post.setPostType(PostTypes.TextAndPhoto);
        postRepository.save(post);
    }
}
