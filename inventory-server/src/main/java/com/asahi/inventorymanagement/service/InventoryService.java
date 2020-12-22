package com.asahi.inventorymanagement.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asahi.inventorymanagement.model.Item;
import com.asahi.inventorymanagement.model.ItemRequest;
import com.asahi.inventorymanagement.repository.ItemRepository;

@Service
public class InventoryService {
	
	@Autowired
	private ItemRepository itemRepository;
	
	public void updateQuantityInItem(ItemRequest itemRequest) {		
		Optional<Item> updatedItem = itemRepository.findById(itemRequest.getItemId());
		int actualQuantity = updatedItem.get().getQuantity();
		int requestedQuantity = itemRequest.getQuantity();
		int updatedQuantity = actualQuantity - requestedQuantity;
		updatedItem.get().setQuantity(updatedQuantity);
		itemRepository.save(updatedItem.get());
		
//		if(requestedQuantity > actualQuantity) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//					.body("Requested qunatity are not available");
//		}else {
//			int updatedQuantity = actualQuantity - requestedQuantity;
//			updatedItem.get().setQuantity(updatedQuantity);
//			return ResponseEntity.status(HttpStatus.OK)
//					.body(itemRepository.save(updatedItem.get()));
//		}
	}
}
