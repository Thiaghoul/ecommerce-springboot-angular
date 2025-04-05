package com.thiaghoul.ecommerce.security.util;

import com.thiaghoul.ecommerce.security.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${app.jwt.expiration}")
    private Integer expiration;

    @Value("${app.jwt.secret}")
    private String secret;

    public boolean isValidToken(String token){
        try{
            Jwts.parser().setSigningKey(secret).build().parseClaimsJws(token);
            return true;
        }catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException e){
            System.out.println(e.getMessage());
        }
        return false;
    }

    public String generateToken(Authentication authentication){
        UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("id", user.getId())
                .claim("firstName", user.getFirstName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
    }

    public String getEmailFromToken(String token){
        return Jwts.parser().setSigningKey(secret).build().parseClaimsJws(token).getBody().getSubject();
    }

    public Key getSigningKey(){
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
