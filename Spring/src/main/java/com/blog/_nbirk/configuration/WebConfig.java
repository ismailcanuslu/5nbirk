package com.blog._nbirk.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://2.56.153.91",
                        "http://2.56.153.91:80",
                        "http://2.56.153.91:5173",
                        "http://2.56.153.91:8443",

                        "http://5nbirk.com",
                        "http://5nbirk.com:80",
                        "http://5nbirk.com:5173",
                        "http://5nbirk.com:8443",

                        "https://localhost",
                        "https://localhost:80",
                        "https://localhost:5173",
                        "https://localhost:8443",

                        "https://api.5nbirk.com",
                        "https://api.5nbirk.com:80",
                        "https://api.5nbirk.com:5173",
                        "https://api.5nbirk.com:8443")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
