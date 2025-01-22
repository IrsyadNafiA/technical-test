package com.technicaltest.mrms_backend.repository;

import com.technicaltest.mrms_backend.entity.MaterialRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRequestRepository extends JpaRepository<MaterialRequest, Integer> { }
