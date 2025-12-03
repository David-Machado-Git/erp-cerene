package com.cerene.cerene.empresa.respository;


import com.cerene.cerene.empresa.entity.EmpresaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<EmpresaEntity, Long> {

}
