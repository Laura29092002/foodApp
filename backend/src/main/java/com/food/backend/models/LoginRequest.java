package com.food.backend.models;

public class LoginRequest {
    private String mail;
    private String mdp;

    public LoginRequest(){}

    public LoginRequest(String mail, String mdp){
        this.mail = mail;
        this.mdp = mdp;

    }

    public String getMail(){
        return mail;
    }

    public void setMail(){
        this.mail = mail;
    }

    public String getMdp(){
        return mdp;
    }

    public void setMdp(){
        this.mdp = mdp;
    }


}
