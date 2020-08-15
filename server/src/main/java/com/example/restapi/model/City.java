package com.example.restapi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "cities")
@Data
public class City{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String name;
	private int population;

	public City(){
	}

	public City(String name){
		this.name = name;
		this.population = 0;
	}

	public City(String name, int pop) {
		this.name = name;
		this.population = pop;
	}
}