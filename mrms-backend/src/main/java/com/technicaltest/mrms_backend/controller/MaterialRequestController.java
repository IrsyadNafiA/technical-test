package com.technicaltest.mrms_backend.controller;

import com.technicaltest.mrms_backend.dto.MaterialRequestDto;
import com.technicaltest.mrms_backend.service.MaterialRequestService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/material-requests")
public class MaterialRequestController {
    private final MaterialRequestService materialRequestService;

    // Add Material Request API
    @PostMapping
    public ResponseEntity<MaterialRequestDto> createMaterialRequest(@RequestBody MaterialRequestDto materialRequestDto) {
        MaterialRequestDto savedRequest = materialRequestService.createMaterialRequest(materialRequestDto);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    // Get Material Request by ID API
    @GetMapping("{id}")
    public ResponseEntity<MaterialRequestDto> getMaterialRequestById(@PathVariable("id") Integer materialId) {
        MaterialRequestDto materialRequestDto = materialRequestService.getMaterialRequestById(materialId);
        return ResponseEntity.ok(materialRequestDto);
    }

    // Get All Material Requests API
    @GetMapping
    public ResponseEntity<List<MaterialRequestDto>> getAllMaterialRequests() {
        List<MaterialRequestDto> materialRequestDto = materialRequestService.getAllMaterialRequests();
        return ResponseEntity.ok(materialRequestDto);
    }

    // Update Material Request Status API
    @PutMapping("{id}")
    public ResponseEntity<MaterialRequestDto> updateMaterialRequestStatus(
            @PathVariable("id") Integer materialId,
            @RequestBody MaterialRequestDto updatedMaterialRequest) {
        MaterialRequestDto materialRequestDto = materialRequestService.updateMaterialRequestStatus(materialId, updatedMaterialRequest);
        return ResponseEntity.ok(materialRequestDto);
    }

    // Delete Material Request API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteMaterialRequest(@PathVariable("id") Integer materialId) {
        materialRequestService.deleteMaterialRequest(materialId);
        return ResponseEntity.ok("Material Request " + materialId + " deleted successfully");
    }
}
