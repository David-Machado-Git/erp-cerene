package com.cerene.cerene.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:8060");  // URL do seu front-end
        corsConfig.addAllowedMethod("GET"); // Permite o método GET
        corsConfig.addAllowedMethod("POST"); // Permite o método POST
        corsConfig.addAllowedMethod("PUT"); // Permite o método PUT
        corsConfig.addAllowedMethod("DELETE"); // Permite o método DELETE
        corsConfig.addAllowedHeader("*"); // Permite qualquer cabeçalho
        corsConfig.setAllowCredentials(true); // Permite o envio de cookies (se necessário)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return source;
    }
}
