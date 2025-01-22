package com.technicaltest.mrms_backend.service.impl;

import com.technicaltest.mrms_backend.dto.MaterialRequestDto;
import com.technicaltest.mrms_backend.entity.MaterialRequest;
import com.technicaltest.mrms_backend.entity.enums.MaterialRequestStatusEnum;
import com.technicaltest.mrms_backend.exception.ResourceNotFoundException;
import com.technicaltest.mrms_backend.mapper.MaterialRequestMapper;
import com.technicaltest.mrms_backend.repository.MaterialRequestRepository;
import com.technicaltest.mrms_backend.service.MaterialRequestService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MaterialRequestServiceImpl implements MaterialRequestService {

    private final MaterialRequestRepository materialRequestRepository;

    @Override
    public MaterialRequestDto createMaterialRequest(MaterialRequestDto materialRequestDto) {
        MaterialRequest materialRequest = MaterialRequestMapper.toEntity(materialRequestDto);
        MaterialRequest savedRequest = materialRequestRepository.save(materialRequest);
        return MaterialRequestMapper.mapToMaterialRequestDto(savedRequest);
    }

    @Override
    public MaterialRequestDto getMaterialRequestById(Integer materialId) {
        MaterialRequest materialRequest = materialRequestRepository.findById(materialId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Material Request is not exists with given id: " + materialId)
                );
        return MaterialRequestMapper.mapToMaterialRequestDto(materialRequest);
    }

    @Override
    public List<MaterialRequestDto> getAllMaterialRequests() {
        List<MaterialRequest> materialRequests = materialRequestRepository.findAll();
        return materialRequests.stream().map(MaterialRequestMapper::mapToMaterialRequestDto)
                .collect(Collectors.toList());
    }

    @Override
    public MaterialRequestDto updateMaterialRequestStatus(Integer materialId, MaterialRequestDto materialRequestDto) {
        MaterialRequest materialRequest = materialRequestRepository.findById(materialId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Material Request is not exists with given id: " + materialId)
                );

        materialRequest.setStatus(Enum.valueOf(MaterialRequestStatusEnum.class, materialRequestDto.getStatus()));
        materialRequest.setApprovalBy(materialRequestDto.getApprovalBy());

        MaterialRequest updatedRequestObj = materialRequestRepository.save(materialRequest);
        return MaterialRequestMapper.mapToMaterialRequestDto(updatedRequestObj);
    }

    @Override
    public void deleteMaterialRequest(Integer materialId) {
        materialRequestRepository.findById(materialId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Material Request is not exists with given id: " + materialId)
                );

        materialRequestRepository.deleteById(materialId);
    }
}
