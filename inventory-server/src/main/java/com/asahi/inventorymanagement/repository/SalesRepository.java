package com.asahi.inventorymanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.asahi.inventorymanagement.model.Sales;

@Repository
public interface SalesRepository extends JpaRepository<Sales, Long> {

}
