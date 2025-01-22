package com.technicaltest.mrms_backend.controller;

import com.technicaltest.mrms_backend.dto.LoginRequestDto;
import com.technicaltest.mrms_backend.dto.LoginResponseDto;
import com.technicaltest.mrms_backend.dto.UserDto;
import com.technicaltest.mrms_backend.service.AuthService;
import com.technicaltest.mrms_backend.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> loginAuth(@RequestBody UserDto userDto) {
        UserDto validUser = authService.loginAuth(userDto.getEmail(), userDto.getPassword());

        if(validUser != null) {
            String token = jwtUtil.generateToken(validUser.getEmail());
            return ResponseEntity.ok(new LoginResponseDto(token));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
    }
}
