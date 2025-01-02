package com.blog._nbirk.dto;

import com.blog._nbirk.entities.User;

public class UserDTO {
    private long id;

    private String username;
    private String email;
    private String profilePhoto;

    private String name;
    private String lastname;

    private String language;
    private String phoneNumber;
    private String country;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public UserDTO(User user) {
        setId(user.getId());
        setUsername(user.getUsername());
        setEmail(user.getEmail());
        setProfilePhoto(user.getProfilePhoto());
        setName(user.getName());
        setLastname(user.getLastname());
        setLanguage(user.getLanguage());
        setPhoneNumber(user.getPhoneNumber());
        setCountry(user.getCountry());
    }

    public UserDTO() {

    }
}
