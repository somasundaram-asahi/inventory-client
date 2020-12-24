package com.asahi.inventorymanagement.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "itemRequest")
@Getter
@Setter
public class ItemRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String itemCode;
	
	private String itemName;

	private Integer quantity;

	private String RequestedBy;

	private String status;

	private Long itemId;
	
	private String reason;

	private Integer itemAvailable;
}
