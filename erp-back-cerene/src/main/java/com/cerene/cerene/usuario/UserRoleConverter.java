package com.cerene.cerene.usuario;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class UserRoleConverter implements AttributeConverter<UserRole, String> {

    @Override
    public String convertToDatabaseColumn(UserRole userRole) {
        if (userRole == null) {
            return null;
        }
        return userRole.getRole(); // Salva o valor "admin" ou "user" no banco
    }

    @Override
    public UserRole convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        for (UserRole role : UserRole.values()) {
            if (role.getRole().equalsIgnoreCase(dbData)) {
                return role; // Retorna o enum correspondente
            }
        }
        throw new IllegalArgumentException("Valor inválido para UserRole: " + dbData);
    }

}
