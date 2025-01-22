package com.technicaltest.mrms_backend.service.impl;

import com.technicaltest.mrms_backend.dto.UserDto;
import com.technicaltest.mrms_backend.entity.User;
import com.technicaltest.mrms_backend.exception.ResourceNotFoundException;
import com.technicaltest.mrms_backend.mapper.UserMapper;
import com.technicaltest.mrms_backend.repository.UserRepository;
import com.technicaltest.mrms_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDto loginAuth(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if(user != null && passwordEncoder.matches(password, user.getPassword())) {
            return UserMapper.mapToUserDto(user);
        }

        return null;
    }
}
