package com.technicaltest.mrms_backend.controller;

import com.technicaltest.mrms_backend.dto.UserDto;
import com.technicaltest.mrms_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    // Add User API
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Get User by id and email API
    @GetMapping("/{identifier}")
    public ResponseEntity<UserDto> getUserByIdOrEmail(@PathVariable("identifier") String identifier) {
        UserDto userDto;
        if (identifier.matches("\\d+")) {
            userDto = userService.getUserById((int) Long.parseLong(identifier));
        } else if (identifier.contains("@")) {
            userDto = userService.getUserByEmail(identifier);
        } else {
            throw new IllegalArgumentException("Invalid identifier: " + identifier);
        }
        return ResponseEntity.ok(userDto);
    }

    // Get All Users API
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Update User API
    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Integer userId, @RequestBody UserDto updatedUser) {
        UserDto userDto = userService.updateUser(userId, updatedUser);
        return ResponseEntity.ok(userDto);
    }

    // Delete User API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Integer userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User " + userId + " deleted successfully!");
    }

}
