package com.technicaltest.mrms_backend.repository;

import com.technicaltest.mrms_backend.entity.MaterialRequestItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRequestItemRepository extends JpaRepository<MaterialRequestItem, Integer> { }
