package com.technicaltest.mrms_backend.service.impl;

import com.technicaltest.mrms_backend.dto.UserDto;
import com.technicaltest.mrms_backend.entity.User;
import com.technicaltest.mrms_backend.exception.ResourceNotFoundException;
import com.technicaltest.mrms_backend.mapper.UserMapper;
import com.technicaltest.mrms_backend.repository.UserRepository;
import com.technicaltest.mrms_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto, passwordEncoder);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto getUserById(Integer userId) {
       User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User is not exists with given id: " + userId)
                );
       return UserMapper.mapToUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserMapper::mapToUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(Integer userId, UserDto updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User is not exists with given id: " + userId)
                );

        user.setName(updatedUser.getName());
        user.setDepartment(updatedUser.getDepartment());
        user.setEmail(updatedUser.getEmail());

        User updatedUserObj =  userRepository.save(user);
        return UserMapper.mapToUserDto(updatedUserObj);
    }

    @Override
    public void deleteUser(Integer userId) {
        userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User is not exists with given id: " + userId)
                );

        userRepository.deleteById(userId);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User is not exists with given email: " + email)
                );
        return UserMapper.mapToUserDto(user);
    }
}
