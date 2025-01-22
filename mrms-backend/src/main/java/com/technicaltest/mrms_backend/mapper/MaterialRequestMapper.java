package com.technicaltest.mrms_backend.mapper;

import com.technicaltest.mrms_backend.dto.MaterialRequestDto;
import com.technicaltest.mrms_backend.dto.MaterialRequestItemDto;
import com.technicaltest.mrms_backend.entity.MaterialRequest;
import com.technicaltest.mrms_backend.entity.MaterialRequestItem;
import com.technicaltest.mrms_backend.entity.enums.MaterialRequestStatusEnum;

import java.util.List;

public class MaterialRequestMapper {

    // Entity -> DTO
    public static MaterialRequestDto mapToMaterialRequestDto(MaterialRequest materialRequest) {
        List<MaterialRequestItemDto> itemDto = materialRequest.getItems().stream()
                .map(item -> new MaterialRequestItemDto(
                        item.getId(),
                        item.getName(),
                        item.getQuantity(),
                        item.getDescription()
                ))
                .toList();

        return new MaterialRequestDto(
                materialRequest.getId(),
                materialRequest.getRequestedBy(),
                materialRequest.getApprovalBy(),
                materialRequest.getStatus().name(),
                materialRequest.getCreatedAt(),
                materialRequest.getUpdatedAt(),
                itemDto
        );
    }

    // DTO -> Entity
    public static MaterialRequest toEntity(MaterialRequestDto materialRequestDto) {
        List<MaterialRequestItem> items = materialRequestDto.getItems().stream()
                .map(itemDto -> {
                    MaterialRequestItem item = new MaterialRequestItem();
                    item.setName(itemDto.getName());
                    item.setQuantity(itemDto.getQuantity());
                    item.setDescription(itemDto.getDescription());
                    return item;
                })
                .toList();

        MaterialRequest materialRequest = new MaterialRequest();
        materialRequest.setRequestedBy(materialRequestDto.getRequestedBy());
        materialRequest.setApprovalBy(materialRequestDto.getApprovalBy());
        materialRequest.setStatus(Enum.valueOf(MaterialRequestStatusEnum.class, materialRequestDto.getStatus()));
        materialRequest.setItems(items);

        items.forEach(item -> item.setMaterialRequest(materialRequest));

        return materialRequest;
    }

}
