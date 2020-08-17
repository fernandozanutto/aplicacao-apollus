package com.example.restapi.model;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class UserDAO {

    enum Type {
        Admin(1), User(2);
        public int value;

        Type(int v){
            value = v;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String username;

    @Column
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column
    private String name = "";

    @Column
    private String status = "";

    @Column
    private Date birth;

    @Column
    private String role = "";

    @Column
    private String address = "";

    @Column(columnDefinition = "TEXT")
    private String bio = "";

    @Column
    private String phone = "";

    @Column
    private int type = 2;

    @Column
    private LocalDateTime lastlogin;
}