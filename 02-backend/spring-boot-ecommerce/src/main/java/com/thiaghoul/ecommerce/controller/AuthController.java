package com.thiaghoul.ecommerce.controller;

import com.thiaghoul.ecommerce.dao.UserRepository;
import com.thiaghoul.ecommerce.dto.JwtDTO;
import com.thiaghoul.ecommerce.dto.LoginDTO;
import com.thiaghoul.ecommerce.dto.SignupDTO;
import com.thiaghoul.ecommerce.entities.User;
import com.thiaghoul.ecommerce.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> authUser(@RequestBody SignupDTO signupDTO) {
        if(userRepository.existsByEmail(signupDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        userRepository.save(new User(signupDTO.getFirstName(), signupDTO.getLastName(), signupDTO.getEmail(), passwordEncoder.encode(signupDTO.getPassword())));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtil.generateToken(authentication);
        return ResponseEntity.ok(new JwtDTO(token));
    }

}
