package com.technicaltest.mrms_backend.service;

import com.technicaltest.mrms_backend.dto.LoginRequestDto;
import com.technicaltest.mrms_backend.dto.UserDto;

public interface AuthService {

    UserDto loginAuth(String email, String password);
}
