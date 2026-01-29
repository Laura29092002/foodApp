package com.food.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "mail")
    private String mail;

    @Column(name = "role")
    private String role;

    @Column(name = "mdp")
    private String mdp;

    @Column(name = "nb_person")
    private Integer nbPerson;

    @Column(name = "regime_id")
    private Integer regimeId;
    


    public User(int id, String firstname, String lastname, String mail, String role, String mdp, Integer nbPerson, Integer regimeId){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.mail = mail;
        this.role = role;
        this.mdp = mdp;
        this.nbPerson = nbPerson;
        this.regimeId = regimeId;
    }

    public User(){}


    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getFirstname(){
        return firstname;
    }

    public void setFirstname(String firstname){
        this.firstname = firstname;
    }

    public String getLastname(){
        return lastname;
    }

    public void setLastname(String lastname){
        this.lastname = lastname;
    }

    public String getMail(){
        return mail;
    }

    public void setMail(String mail){
        this.mail = mail;
    }

    public String getRole(){
        return role;
    }

    public void setRole(String role){
        this.role = role;
    }

    public String getMdp(){
        return mdp;
    }

    public void setMdp(String mdp){
        this.mdp = mdp;
    }

    public Integer getNbPerson(){
        return nbPerson;
    }

    public void setNbPerson(Integer nbPerson){
        this.nbPerson = nbPerson;
    }

    public Integer getRegimeId(){
        return regimeId;
    }

    public void setRegimeId(Integer regimeId){
        this.regimeId = regimeId;
    }


    
}
