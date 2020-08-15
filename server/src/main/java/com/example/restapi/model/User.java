package com.example.restapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class User  {

    public enum Type {
        Admin(1), User(2);

        public int value;
        Type(int value){
            this.value = value;
        }
    }

    private int id;
    private String name;
    private String email;
    private String bio;
    private String password;
    private Type type;
    
}