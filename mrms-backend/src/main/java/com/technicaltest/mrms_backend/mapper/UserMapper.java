package com.technicaltest.mrms_backend.mapper;

import com.technicaltest.mrms_backend.dto.UserDto;
import com.technicaltest.mrms_backend.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getDepartment(),
                user.getEmail(),
                null
        );
    }

    public static User mapToUser(UserDto userDto, PasswordEncoder passwordEncoder) {
        return new User(
                userDto.getId(),
                userDto.getName(),
                userDto.getDepartment(),
                userDto.getEmail(),
                passwordEncoder.encode(userDto.getPassword())
        );
    }
}
