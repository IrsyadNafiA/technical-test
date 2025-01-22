package com.technicaltest.mrms_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialRequestItemDto {
    private Integer id;
    private String name;
    private Integer quantity;
    private String description;
}