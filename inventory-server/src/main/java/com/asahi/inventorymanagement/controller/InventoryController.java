package com.asahi.inventorymanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asahi.inventorymanagement.model.Item;
import com.asahi.inventorymanagement.model.ItemRequest;
import com.asahi.inventorymanagement.repository.ItemRepository;
import com.asahi.inventorymanagement.repository.ItemRequestRepository;
import com.asahi.inventorymanagement.service.InventoryService;

@RestController
@RequestMapping("/api")
public class InventoryController {
	
	@Autowired
	private ItemRequestRepository itemRequestRepository;
	
	@Autowired
	private ItemRepository itemRepository;
	
	@Autowired
	private InventoryService inventoryService;
	
	@GetMapping("/item")
	public List<Item> getAllItem(){
		List<Item> items = itemRepository.findAll();
		return items;
	}
	
	//sent with requested status
	@PostMapping("/item-request")
    public ResponseEntity<?> getItemRequest(@RequestBody ItemRequest itemRequest) {
		ItemRequest result = itemRequestRepository.save(itemRequest);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
	
	//sent with approve status
	@PutMapping("/item-request")
	public ResponseEntity<?> updateItemRequest(@RequestBody ItemRequest itemRequest){	
		ItemRequest result;
		if(itemRequest.getStatus().equals("APPROVED")) {
			inventoryService.updateQuantityInItem(itemRequest);
			result = itemRequestRepository.save(itemRequest);
		}else {
			//send notification
			result = itemRequestRepository.save(itemRequest);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Requested qunatity are not available");
		}
				
        return new ResponseEntity<>(result, HttpStatus.OK); 
	}
	
	@GetMapping("/item-request-list")
	public List<ItemRequest> itemRequestList(){
		List<ItemRequest> itemRequests = itemRequestRepository.findAll();
		return itemRequests;
	}
	
	//send with accepted status
	@PutMapping("/item-request-approve")
	public ResponseEntity<?> productionVerify(@RequestBody ItemRequest itemRequest){
		ItemRequest result = itemRequestRepository.save(itemRequest);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

}
