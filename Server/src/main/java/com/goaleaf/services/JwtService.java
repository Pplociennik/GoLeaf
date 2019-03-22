package com.goaleaf.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import javax.xml.bind.DatatypeConverter;

import static com.goaleaf.security.SecurityConstants.SECRET;

@Service
public class JwtService {
    public boolean Validate(String token) {
//        Claims claims = Jwts.parser()
//                .setSigningKey(SECRET)
//                .parseClaimsJws(token).getBody();
        Algorithm algorithm = Algorithm.HMAC512(SECRET);
        JWTVerifier verifier = JWT.require(algorithm)
                .build(); //Reusable verifier instance
        DecodedJWT jwt = verifier.verify(token);
        return true;
    }
}
