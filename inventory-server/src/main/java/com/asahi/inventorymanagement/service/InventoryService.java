package com.asahi.inventorymanagement.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.asahi.inventorymanagement.model.Item;
import com.asahi.inventorymanagement.model.ItemRequest;
import com.asahi.inventorymanagement.repository.ItemRepository;

@Service
public class InventoryService {

	@Autowired
	private ItemRepository itemRepository;

	public ResponseEntity<?> updateQuantityInItem(ItemRequest itemRequest) {
		
		Optional<Item> updatedItem = itemRepository.findById(itemRequest.getItemId());
		int actualQuantity = updatedItem.get().getQuantity();
		int requestedQuantity = itemRequest.getQuantity();
		int updatedQuantity = actualQuantity - requestedQuantity;
		
		if(requestedQuantity > actualQuantity) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Requested quantity are not available");
		}else {
			updatedItem.get().setQuantity(updatedQuantity);
			return ResponseEntity.status(HttpStatus.OK)
					.body(itemRepository.save(updatedItem.get()));
		}
		
	}
}
