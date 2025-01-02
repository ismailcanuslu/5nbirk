package com.blog._nbirk.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "nbirk")
@Configuration
public class AppProperties {

    private Email email;
    private Client client;
    private String tokenType;

    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public record Email(
            String username,
            String password,
            String host,
            int port,
            String from
    ){}

    public record Client(
            String host
    ){ }
}
