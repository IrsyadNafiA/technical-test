package com.technicaltest.mrms_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialRequestDto {
    private Integer id;
    private String requestedBy;
    private String approvalBy;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<MaterialRequestItemDto> items;
}
