package com.cerene.cerene.empresa.entity;


import com.cerene.cerene.usuario.UsuarioEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@Table(name = "empresa") // Nome da tabela no banco de dados
public class EmpresaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String empresa;

    //@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<UsuarioEntity> usuarios = new ArrayList<>();

    public EmpresaEntity() {
    }



}
