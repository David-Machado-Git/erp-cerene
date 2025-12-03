package com.cerene.cerene.usuario;

public record RegisterDTO(String login, String password, UserRole role, Long empresaId) {
}
