package com.technicaltest.mrms_backend.service;

import com.technicaltest.mrms_backend.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);
    UserDto getUserById(Integer id);
    List<UserDto> getAllUsers();
    UserDto updateUser(Integer userId, UserDto updatedUser);
    void deleteUser(Integer userId);
    UserDto getUserByEmail(String email);
}
