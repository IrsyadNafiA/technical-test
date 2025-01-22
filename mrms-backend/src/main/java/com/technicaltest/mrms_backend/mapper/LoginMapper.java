package com.technicaltest.mrms_backend.mapper;

import com.technicaltest.mrms_backend.dto.LoginResponseDto;

public class LoginMapper {

    public static LoginResponseDto mapToLoginResponseDto(String token) {
        return new LoginResponseDto(token);
    }
}
