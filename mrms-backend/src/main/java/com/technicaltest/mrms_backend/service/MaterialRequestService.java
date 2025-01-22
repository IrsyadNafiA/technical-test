package com.technicaltest.mrms_backend.service;

import com.technicaltest.mrms_backend.dto.MaterialRequestDto;

import java.util.List;

public interface MaterialRequestService {

    MaterialRequestDto createMaterialRequest(MaterialRequestDto materialRequestDto);
    MaterialRequestDto getMaterialRequestById(Integer materialId);
    List<MaterialRequestDto> getAllMaterialRequests();
    MaterialRequestDto updateMaterialRequestStatus(Integer materialId, MaterialRequestDto materialRequestDto);
    void deleteMaterialRequest(Integer materialId);

}
