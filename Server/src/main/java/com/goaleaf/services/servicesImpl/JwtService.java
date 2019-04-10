package com.goaleaf.services.servicesImpl;

public interface JwtService {

    public boolean Validate(String token, String secret);
}
