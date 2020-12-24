package com.asahi.inventorymanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asahi.inventorymanagement.model.Item;
import com.asahi.inventorymanagement.model.ItemRequest;
import com.asahi.inventorymanagement.model.Product;
import com.asahi.inventorymanagement.model.Sales;
import com.asahi.inventorymanagement.repository.ItemRepository;
import com.asahi.inventorymanagement.repository.ItemRequestRepository;
import com.asahi.inventorymanagement.repository.ProductRepository;
import com.asahi.inventorymanagement.repository.SalesRepository;
import com.asahi.inventorymanagement.service.InventoryService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
public class InventoryController {

	@Autowired
	private ItemRequestRepository itemRequestRepository;

	@Autowired
	private ItemRepository itemRepository;

	@Autowired
	private InventoryService inventoryService;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private SalesRepository salesRepository;

	@GetMapping("/item")
	public List<Item> getAllItem() {
		List<Item> items = itemRepository.findAll();
		return items;
	}

	// sent with requested status
	@PostMapping("/item-request")
	public ResponseEntity<?> getItemRequest(@RequestBody ItemRequest itemRequest) {
		Integer availableItem = itemRepository.findById(itemRequest.getItemId()).get().getQuantity();
		itemRequest.setItemAvailable(availableItem);
		itemRequest.setRequestedBy("PRODUCTION");
		ItemRequest result = itemRequestRepository.save(itemRequest);
		return new ResponseEntity<>(result, HttpStatus.CREATED);
	}
	
	//item that are requested and declined
	@GetMapping("/item-requested")
	public List<ItemRequest> getItemRequest() {
		List<ItemRequest>  itemrequest = itemRequestRepository.fetchRequestedItems();
		return itemrequest;
	}
	
	//item that are in approved state and declined 
	@GetMapping("/item-approved")
	public List<ItemRequest> getItemApproved() {
		List<ItemRequest>  itemrequest = itemRequestRepository.fetchApprovedItems();
		return itemrequest;
	}

	// sent with approve status from warehouse to production
	@PutMapping("/item-request")
	public ResponseEntity<?> updateItemRequest(@RequestBody ItemRequest itemRequest) {
		ResponseEntity<?> result;
		if (itemRequest.getStatus().equalsIgnoreCase("APPROVED")) {
			result = inventoryService.updateQuantityInItem(itemRequest);
			return result;
		} else {
			// send notification
			itemRequestRepository.save(itemRequest);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requested quantity are not available");
		}

	}

	@GetMapping("/item-request-list")
	public List<ItemRequest> itemRequestList() {
		List<ItemRequest> itemRequests = itemRequestRepository.findAll();
		for (ItemRequest itemRequest : itemRequests) {
			itemRequest.setItemAvailable(itemRepository.findById(itemRequest.getItemId()).get().getQuantity());
			;
		}
		return itemRequests;
	}

	// send with accepted status production to ?
	@PutMapping("/item-request-approval")
	public ResponseEntity<?> itemVerificationByProductionTeam(@RequestBody ItemRequest itemRequest) {
//		if (itemRequest.getStatus().equalsIgnoreCase("DECLINED")) {
//			// send mail to warehouse team
//			// again rerequest the same item
////			itemRequest.setStatus("REQUESTED");
//		} else {
//			// the manufacturing team will prepare the product and the product table will
//			// have an entry now with the finished product
//		}
		ItemRequest result = itemRequestRepository.save(itemRequest);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	// Hardcoded values will have the status - Testing
	@GetMapping("/products")
	public List<Product> getAllManufacturedProduct() {
		List<Product> products = productRepository.findAll();
		return products;
	}

	@PutMapping("/finished-product-approval")
	public ResponseEntity<?> updateProductStatus(@RequestBody Product productDetails) {
		if (productDetails.getStatus().equalsIgnoreCase("APPROVED")) {
			Sales salesDetails = new Sales();
			salesDetails.setProductId(productDetails.getId());
			salesDetails.setProductName(productDetails.getName());
			salesDetails.setQuantity(productDetails.getQuantity());
			salesDetails.setStatus("RECEIVED");
			salesRepository.save(salesDetails);
			// move the product to sales table
		} else {
			// send mail saying having some rework
			// the manufacturing team will be assigned for reworking
		}

		Product product = productRepository.save(productDetails);
		return new ResponseEntity<>(product, HttpStatus.OK);
	}
	
	@GetMapping("/product-in-testing")
	public List<Product> getProductInTested() {
		List<Product>  productInTesting = productRepository.fetchProductsInTesting();
		return productInTesting;
	}
	
	@GetMapping("/product-approved")
	public List<Product> getProductApproved() {
		List<Product>  productApproved = productRepository.fetchProductsApproved();
		return productApproved;
	}
	

	@GetMapping("/sales")
	public List<Sales> getAllSalesProduct() {
		List<Sales> salesProducts = salesRepository.findAll();
		return salesProducts;
	}

	@PutMapping("/sales-product-shipment")
	public ResponseEntity<?> updateSalesProductStatus(@RequestBody Sales salesProduct) {
		Sales updatedSalesProduct = salesRepository.save(salesProduct);
		return new ResponseEntity<>(updatedSalesProduct, HttpStatus.OK);
	}
	
}
