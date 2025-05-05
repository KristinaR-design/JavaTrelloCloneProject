package org.example.loginservice;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsersService usersService;

    @Autowired
    UserCastomService userCastomService;

    @Autowired
    PasswordEncoder passwordEncoder;


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        System.out.println("Attempting login for: " + credentials.get("login"));
        System.out.println("Attempting login for: " + credentials.get("password"));
        try {
            UserDetails userDetails = userCastomService.loadUserByUsername(credentials.get("login"));
            boolean passwordMatches = passwordEncoder.matches(
                    credentials.get("password"),
                    userDetails.getPassword()
            );

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.get("login"),
                            credentials.get("password")
                    )
            );

            System.out.println("Authentication successful for: " + authentication.getName());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Сохраняем аутентификацию в сессии!
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            request.getSession(true).setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            return ResponseEntity.ok(usersService.getUserByLogin(credentials.get("login")) + "");
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully!");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, String> credentials) {
        try {
            User user = new User();
            user.setLogin(credentials.get("login"));
            String a = passwordEncoder.encode(credentials.get("password"));
            user.setPassword(a);
            System.out.println((passwordEncoder.matches(credentials.get("password"), a)));
            System.out.println(a);
            usersService.createUser(user);
            return ResponseEntity.ok("User registered");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
}