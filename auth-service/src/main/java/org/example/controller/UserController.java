package org.example.controller;

import org.example.entity.User;
import org.example.enums.UserRole;
import org.example.security.JwtTokenProvider;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userservice;
    private final JwtTokenProvider jwtTokenProvider;
    @Autowired
    public UserController(UserService userservice, JwtTokenProvider jwtTokenProvider) {
        this.userservice = userservice;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userservice.saveUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userservice.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userservice.getUserById(id);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginUser) {
        User authenticatedUser = userservice.loginUser(loginUser.getEmail(), loginUser.getPassword());

        if (authenticatedUser != null) {
            String token = jwtTokenProvider.generateToken(authenticatedUser.getEmail(),authenticatedUser.getUserRole());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    @GetMapping("/validateToken/{token}")
    public ResponseEntity<String> validateTokenAndGetEmail(@PathVariable String token) {
        boolean isValid = jwtTokenProvider.validateToken(token);
        if (isValid) {
            String email = jwtTokenProvider.getEmailFromToken(token);
            UserRole role= jwtTokenProvider.getUserRoleFromToken(token);
            return ResponseEntity.ok("Valid Token. Email: " + email +"|"+ "Role: "+role);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }
    }

}

