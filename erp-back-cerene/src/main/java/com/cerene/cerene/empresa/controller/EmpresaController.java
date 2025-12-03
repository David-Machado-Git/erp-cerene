package com.cerene.cerene.empresa.controller;

import com.cerene.cerene.empresa.respository.EmpresaRepository;
import com.cerene.cerene.usuario.UsuarioEntity;
import com.cerene.cerene.empresa.entity.EmpresaEntity;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("empresa")
public class EmpresaController {

    @Autowired
    private EmpresaRepository repository;

    @PostMapping
    public EmpresaEntity criarEmpresa(@RequestBody EmpresaEntity empresa) {
        for (UsuarioEntity usuario : empresa.getUsuarios()) {
            String encryptedPassword = new BCryptPasswordEncoder().encode(usuario.getPassword());
            usuario.setPassword(encryptedPassword); // Define a senha criptografada
        }
        return repository.save(empresa);
    }

    @Transactional
    @GetMapping
    public ResponseEntity getAllEmpresas() {
        List<EmpresaEntity> empresaList = this.repository.findAll();
        return ResponseEntity.ok(empresaList);
    }

}
