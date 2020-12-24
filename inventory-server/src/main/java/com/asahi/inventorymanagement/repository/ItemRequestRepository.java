package com.asahi.inventorymanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.asahi.inventorymanagement.model.ItemRequest;

@Repository
public interface ItemRequestRepository extends JpaRepository<ItemRequest, Long> {
	
	@Query("from ItemRequest i where i.status='REQUESTED' OR i.status='DECLINED'")
     List<ItemRequest> fetchRequestedItems();
	
	@Query("from ItemRequest i where i.status='APPROVED' OR i.status='DECLINED'")
    List<ItemRequest> fetchApprovedItems();

}
