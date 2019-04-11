package com.goaleaf.services.servicesImpl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.goaleaf.services.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtServiceImpl implements JwtService {
    public boolean Validate(String token, String secret) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(token).getBody();
        Algorithm algorithm = Algorithm.HMAC512(secret);
        JWTVerifier verifier = JWT.require(algorithm)
                .build(); //Reusable verifier instance
        DecodedJWT jwt = verifier.verify(token);

//        JWTParser parser = new JWTParser();
//        Payload jwtInfo = parser.parsePayload(jwt.getPayload());
        Date expDate = claims.getExpiration();

        if (!new Date().before(expDate))
            return false;

        return true;
    }
}
