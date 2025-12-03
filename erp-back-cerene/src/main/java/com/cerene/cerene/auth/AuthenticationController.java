package com.cerene.cerene.auth;

import com.cerene.cerene.empresa.respository.EmpresaRepository;
import com.cerene.cerene.security.TokenService;
import com.cerene.cerene.usuario.*;
import com.cerene.cerene.empresa.entity.EmpresaEntity;
import com.cerene.cerene.usuario.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((UsuarioEntity) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        // Verifica se já existe um usuário com o login fornecido
        if (this.repository.findByLogin(data.login()) != null) {
            return ResponseEntity.badRequest().body("Já existe um usuário com este mesmo login. Tente um login diferente.");
        }

        // Busca a empresa pelo ID fornecido
        EmpresaEntity empresa = this.empresaRepository.findById(data.empresaId())
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));

        // Criptografa a senha do usuário
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

        // Cria o novo usuário
        UsuarioEntity newUser = new UsuarioEntity(data.login(), encryptedPassword, data.role(), empresa);

        // Salva o novo usuário
        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/validate-token")
    public ResponseEntity<Void> validateToken(@RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        String subject = tokenService.validateToken(token);

        if (subject.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        tokenBlacklistService.addToBlacklist(token);
        return ResponseEntity.ok().build();
    }

}
